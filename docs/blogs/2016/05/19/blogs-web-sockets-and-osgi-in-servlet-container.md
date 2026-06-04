---
title: "WebSockets and Equinox OSGi in a Servlet Container"
author: Nedelcho Delchev
author_gh_user: delchev
author_avatar: https://avatars.githubusercontent.com/u/6852373?v=4
read_time: 15 min
publish_date: May 19, 2016
---

How to use WebSockets, coming as a standard feature with the modern Servlet Containers (e.g. Tomcat 7.x) from within the embedded Equinox OSGi environment deployed as a WAR application archive? If you haven't asked yourself such a question so far, just forget it and live in peace...
But in case you have already quite serious reasons to separate the functionality of your huge and complex application to plugins to be manageable and already have chosen the OSGi way with the Eclipse Equinox implementation and in the same time you want your application in the Web, most probably you already know the nasty issues that appear ones you try something aside from the standard "ServletBridge" scenario.

## Background

OK, if you are not aware about the above use-case, but still want to learn what it is about let's start with some prerequisites:

- What is WebSockets by Matt West: [http://blog.teamtreehouse.com/an-introduction-to-websockets](http://blog.teamtreehouse.com/an-introduction-to-websockets)
- What is OSGi in Servlet Container series by Angelo Zerr: [https://angelozerr.wordpress.com/2010/08/31/osgi-equinox-in-a-servlet-container-step0/](https://angelozerr.wordpress.com/2010/08/31/osgi-equinox-in-a-servlet-container-step0/)

## The Problem

Now, assuming you got the idea how the architecture looks like and you are convinced it worths the effort - what is the problem?
On one side we have the web application environment, which is as standard as any other web application running on the Tomcat server. You can have there Servelts, WebSockets, etc. You have access to the shared libraries within the Tomcat/lib folder as any other application has.

## The Solution

### ClassLoaders visibility

The first problem is how to make the WebSockets API classes to be visible at runtime by the OSGi environment? This is configured in the *launch.ini* file as:
1. OSGi's parent and context class-loaders have to be set to *fwk*
2. the transitive packages are listed in the *extra* property

	osgi.*=@null
	org.osgi.*=@null
	eclipse.*=@null

	osgi.parentClassloader=fwk
	osgi.contextClassLoaderParent=fwk
	org.osgi.framework.system.packages.extra=javax.websocket,javax.websocket.server,javax.mail,javax.mail.internet,org.eclipse.dirigible.ide.bridge

The actual file can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/releng/all.tomcat/src/main/webapp/WEB-INF/launch.ini)

### Configure Dependency

During the development you will need to include the WebSockets API in the target platform. This is required to develop your server side logic in a plugin against the WebSockets API. You can refer the already available artifact in the Orbit repository [here](http://download.eclipse.org/tools/orbit/downloads/drops/R20150519210750/)

In your *.target file add the following:

```xml

	<location includeAllPlatforms="false" includeConfigurePhase="true" includeMode="slicer" includeSource="true" type="InstallableUnit">
	...
	<unit id="javax.websocket" version="1.0.0.v20140310-1603"/>
	<repository location="http://download.eclipse.org/tools/orbit/downloads/drops/R20150519210750/repository"/>
	</location>

```

The target platform file of Dirigible can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/platform/org.eclipse.dirigible.platform.target/org.eclipse.dirigible.platform.base.target)

After the reloading of the target platform, *javax.websocket* package is available and can be added to a manifest file of the plugin you want to use for the server-side implementation:

	Import-Package:
	 ...
	 javax.websocket,
	 javax.websocket.server

... and the corresponding sample from the Dirigible code-base [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.metrics/META-INF/MANIFEST.MF)

> Important - use package import not plugin dependency as soon as at the runtime the classes will be exposed by the application class-loader not by the OSGi parent class-loader itself.

### WebSocket Proxy (outside OSGi)

We made the necessary configurations, now we can start with the implementation of our WebSocket servlet. Let's create a real-time logging servlet, which can send immediately the log messages to all the clients currently connected to it. First of all we need the standard implementation of a WebSocket outside of the OSGi environment. It will accept the connections from the clients and will play a role of a bridge to the OSGi environment. We can use the standard annotations @ServerEndpoint, @onOpen, @onMessage, @onError and @onClose


```java

	...

	@ServerEndpoint("/log")
	public class WebSocketLogBridgeServlet {

		private static final Logger logger = LoggerFactory.getLogger(WebSocketLogBridgeServlet.class);

		private static Map<String, Session> openSessions = new ConcurrentHashMap<String, Session>();

		@OnOpen
		public void onOpen(Session session) throws IOException {
			openSessions.put(session.getId(), session);
			callInternal("onOpen", session, null);
		}

		protected void callInternal(String methodName, Session session, String message) {

			logger.debug("Getting internal pair...");

			Object logInternal = DirigibleBridge.BRIDGES.get("websocket_log_channel_internal");

			logger.debug("Getting internal pair passed: " + (logInternal != null));

			if (logInternal == null) {
				String peerError = "Internal WebSocket peer for Log Service is null.";
				logger.error(peerError);
				try {
					session.getBasicRemote().sendText(peerError);
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
				}
				return;
			}

			try {
				Method method = null;
				if (message == null) {
					method = logInternal.getClass().getMethod(methodName, Session.class);
					method.invoke(logInternal, session);
				} else {
					method = logInternal.getClass().getMethod(methodName, String.class, Session.class);
					method.invoke(logInternal, message, session);
				}
			} catch (NoSuchMethodException e) {
				logger.error(e.getMessage(), e);
			} catch (SecurityException e) {
				logger.error(e.getMessage(), e);
			} catch (IllegalAccessException e) {
				logger.error(e.getMessage(), e);
			} catch (IllegalArgumentException e) {
				logger.error(e.getMessage(), e);
			} catch (InvocationTargetException e) {
				logger.error(e.getMessage(), e);
			}
		}

		@OnMessage
		public void onMessage(String message, Session session) {
			callInternal("onMessage", session, message);
		}

		@OnError
		public void onError(Session session, Throwable t) {
			callInternal("onError", session, t.getMessage());
			logger.error(t.getMessage(), t);
		}

		@OnClose
		public void onClose(Session session) {
			openSessions.remove(session.getId());
			callInternal("onClose", session, null);
		}

	...

```

full source code [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/bridge/org.eclipse.dirigible.bridge/src/org/eclipse/dirigible/ide/bridge/WebSocketLogBridgeServlet.java)

The interesting part here is the *BRIDGES* map, which contains the already registered bridges coming from the OSGi environment.

```java

	Object logInternal = DirigibleBridge.BRIDGES.get("websocket_log_channel_internal");

```

The source code of the DirigibleBridge can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/bridge/org.eclipse.dirigible.bridge/src/org/eclipse/dirigible/ide/bridge/DirigibleBridge.java)


### WebSocket Bridge (inside OSGi)

We have already the WebSocket end-point, which will accept the connections and will redirect the corresponding calls to the internal "bridge" object. Let's have a look at the bridge implementation itself:

```java

		...

		private static Map<String, Session> openSessions = new ConcurrentHashMap<String, Session>();

		@OnOpen
		public void onOpen(Session session) throws IOException {
			openSessions.put(session.getId(), session);
			session.getBasicRemote().sendText("[log] open: " + session.getId());
			logger.debug("[ws:log] onOpen: " + session.getId());
		}

		@OnMessage
		public void onMessage(String message, Session session) {
			logger.debug("[ws:log] onMessage: " + message);
		}

		@OnError
		public void onError(Session session, String error) {
			logger.debug("[ws:log] onError: " + error);
		}

		@OnClose
		public void onClose(Session session) {
			openSessions.remove(session.getId());
			logger.debug("[ws:log] onClose: Session " + session.getId() + " has ended");
		}

		public static void sendText(String sessionId, String message) {
			try {
				if (sessionId == null) {
					for (Object element : openSessions.values()) {
						Session session = (Session) element;
						session.getBasicRemote().sendText(message);
					}
				} else {
					openSessions.get(sessionId).getBasicRemote().sendText(message);
				}
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
		}

		@Override
		public void log(String level, String message) {
			for (Session session : openSessions.values()) {
				try {
					synchronized (session) {
						session.getBasicRemote().sendText(String.format("[%s] %s", level, message));
					}
				} catch (Throwable e) {
					// do not log it with the Logger
					e.printStackTrace();
				}
			}
		}

	...

```

source code [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.metrics/src/org/eclipse/dirigible/runtime/log/WebSocketLogBridgeServletInternal.java)

We can use the same WebSockets API classes like *javax.websocket.Session* and even the annotations for the methods (of course the annotations in the above example are just for clarity as soon as there is no actual processor for them within the OSGi environment).

Ones we have the implementation of the internal (bridge) part of the pair, we have to add a registration logic to the plugin activator:

```java

	public class MetricsActivator implements BundleActivator {

		private static final Logger logger = Logger.getLogger(MetricsActivator.class);

		WebSocketLogBridgeServletInternal webSocketLogBridgeServletInternal;

		@Override
		public void start(BundleContext context) throws Exception {

			...

			setupLogChannel();
		}

		protected void setupLogChannel() {

			logger.debug("Setting log channel internal ...");

			webSocketLogBridgeServletInternal = new WebSocketLogBridgeServletInternal();

			DirigibleBridge.BRIDGES.put("websocket_log_channel_internal", webSocketLogBridgeServletInternal);

			Logger.addListener(webSocketLogBridgeServletInternal);

			logger.debug("Log channel internal has been set.");

		}

		@Override
		public void stop(BundleContext context) throws Exception {
			webSocketLogBridgeServletInternal.closeAll();
			Logger.removeListener(webSocketLogBridgeServletInternal);
		}

	}

```

source code [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.metrics/src/org/eclipse/dirigible/runtime/metrics/MetricsActivator.java)


### WebSocket Client

At this step we are ready with the server side implementation. Let's create a simple user interface in HTML and client-side JavaScript, which will connect to the Log WebSocket Service and will print every single log message to the body of the page:

```html

	...
	<body onload="connectToLog()">
	<script>
	var connectToLog = function() {
		try {
			var logSocket = new WebSocket(((location.protocol === 'https:') ? "wss://" : "ws://")
					+ window.location.host + "/log");
		} catch(e) {
			document.writeln("<div style='background-color: black; font-family: monospace; color: red'>[" + new Date().toISOString() + "][error]" + e.message + "</div>");

		}
		logSocket.onmessage = function (message) {
			var color = "#44EE44";
			if (message.data.startsWith("[error]")) {
				color = "red";
			}
			var date = new Date();
			var id = date.getTime();
			document.writeln("<div id='" + id + "' style='background-color: black; font-family: monospace; color: " + color + "'>[" + date.toISOString() + "]" + message.data + "</div>");
			window.location.hash = "#" + id;
		};

		setInterval(clear, 60000);
	}
	var clear = function() {
		document.body.innerHTML = '';
		document.writeln("<div style='background-color: black; font-family: monospace; color: gray'>[" + new Date().toISOString() + "][clear]...</div>");
	}
	</script>
	...

```

source code [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.ui/resources/ui/templates/monitoring/logging/log.html)

The assumption here is that the protocol of the WebSocket connection has the same security level as the page itself http->ws https->wss. On receiving a log message the "logSocket.onmessage" function is called. The other function "clear" is added just for usability and performance reasons.

The above user interface can be used stand-alone or can be embedded in the Registry portal or in the WebIDE.

<br>
<img src="/img/posts/20160426-0/log-console-registry.png" width="700px"/>
<br>


<br>
<img src="/img/posts/20160426-0/log-console-webide.png" width="700px"/>
<br>

Can it be easier?

Yes - with Eclipse Dirigible!

The support of WebSockets in Dirigible's Scripting Services is coming with release 2.4 - today!
2.0 compliant API is on place and sample will be provided shortly.

Enjoy!
