---
layout: help
---

Debug
===

The toolkit offers Debugging functionality. The goal is to easy the developers in the hunt of server side bugs.

Debug Perspective
---
![Debugger Debug View](images/features/debugger/5_debugger_debug_view.png)
*	*Sessions* - contains all debug execution sessions.
*	*Variables/Values* - contains variables and their values, available in the current scope of execution.
*	*File/Row/Source* - contains inforamation about in witch file and witch row, a *Breakpoint* is set. 

Available Commands
---
*	![Button Refresh](images/features/debugger/5_button_refresh.png) Refresh
*	![Button Step Into](images/features/debugger/5_button_step_into.png) Step Into
*	![Button Step Over](images/features/debugger/5_button_step_over.png) Step Over
*	![Button Continue](images/features/debugger/5_button_continue.png) Continue
*	![Button Skip All Breakpoints](images/features/debugger/5_button_skip_all_breakpoints.png) Skip all breakpoints

Debugging Example
---
Step 0 - Project Structure
---

![Project](images/features/debugger/1_project.png)

*simple_service.js*
<pre><code>
main();

function main(){
    var message = createMessage();
    var students = createStudents();
    response.getWriter().println(message);
    response.getWriter().println(JSON.stringify(students));
}

function createMessage(){
    var initialValue = 1;
    var endValue = startCounter(initialValue);
	var message = 'Initial value was '+initialValue+', end value is '+endValue;
    return message;
}

function startCounter(value) {
    for(var i = 0; i < 5; i++){
        value ++;
    }
	return value;
}

function createStudents(){
    var students = [];
    students.push(createStudent('Desi', 18));
    students.push(createStudent('Jordan', 21));
    students.push(createStudent('Martin', 22));
    return students;
}

function createStudent(name, age){
    var student = {};
    student.name = name;
    student.age = age;
    return student;
}
</code></pre>

*library_jslib*
<pre><code>
exports.generateGuid = function() {
    var guid = ''+uuid.randomUUID();
    return guid;
};
</code></pre>

*require_service.js*
<pre><code>
var guidGen = require('/DebuggerDemo/library');
var user = 'Test User';
var id = guidGen.generateGuid();

response.getWriter().println(user+", id "+id);
response.getWriter().flush();
response.getWriter().close();
</code></pre>

Step 1 - Open Debug Perspective
---

Click *other...* to list available perspectives

![Perspectives](images/features/debugger/3_perspectives.png)

From the list select *Debug* perspective

![Open Perspective](images/features/debugger/4_open_perspective.png)

Now *Debug* perspective is opened

![Debugger Debug View](images/features/debugger/5_debugger_debug_view.png)

Step 2 - Start Debugging
---

Select *simple_service.js* from *Workspace Explorer*

![Project](images/features/debugger/1_project.png)

Debugger was started and waits for user interaction

![Debugger Start Session](images/features/debugger/7_debugger_start_session.png)

In the *Debug* view press *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button to list available *Debug Sessions* and select one.

![Debugger Select Session](images/features/debugger/8_debugger_select_session.png)

Press *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png) button to continue script's execution.

![Debugger Step Into](images/features/debugger/9_debugger_step_into.png)

Let's set some *Breakpoints*.
Click on the line numbers on the left of the opened editor.
Press *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button to see *Breakpoints* that were set.

![Debugger Set Breakpoints](images/features/debugger/10_debugger_set_breakpoints.png)

Press *Continue* ![Button Continue](images/features/debugger/5_button_continue.png) button to resume script's execution to the next *Breakpoint*.

![Debugger Continue](images/features/debugger/11_debugger_continue.png)

Press *Continue* ![Button Continue](images/features/debugger/5_button_continue.png) button again.

![Debugger Continue](images/features/debugger/12_debugger_continue.png)

To exit *Debug Session* press *Skip all breakpoints* ![Button Skip All Breakpoints](images/features/debugger/5_button_skip_all_breakpoints.png) button 
or continue pressing *Step Over* ![Button Step Over](images/features/debugger/5_button_step_over.png) 
or *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png) buttons until script's execution finish.

Step 3 - Debugging Scripts Requiring Libraries
---

Select *require_service.js* from *Workspace Explorer*

![Debugger Select Require Service](images/features/debugger/15_debugger_select_require_service.png)

![Debugger Start Session](images/features/debugger/16_debugger_start_session.png)

A new *Debug Session* was started.
Press *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button, select session and 
press *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png) button.

![Debugger Step Into](images/features/debugger/17_debugger_step_into.png)

Continue debugging.

![Debugger Step Into](images/features/debugger/18_debugger_step_into.png)

![Debugger Step Over](images/features/debugger/19_debugger_step_over.png)
