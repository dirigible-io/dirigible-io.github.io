---
layout: help
title: Debug
icon: fa-wrench
group: help-perspectives
---

Debugging
===

The toolkit offers *Debug* functionality. The goal is to facilitate developers in the hunt of server-side bugs.

###Debug Perspective###

![Debugger Debug View](images/features/debugger/5_debugger_debug_view.png)

*	*Sessions* - contains all debug execution sessions.
*	*Variables/Values* - contains variables and their values, available in the current scope of execution.
*	*File/Row/Source* - contains inforamation about in witch file and witch row, a *Breakpoint* is set. 

###Available Commands###

*	![Button Refresh](images/features/debugger/5_button_refresh.png) Refresh
*	![Button Step Into](images/features/debugger/5_button_step_into.png) Step Into
*	![Button Step Over](images/features/debugger/5_button_step_over.png) Step Over
*	![Button Continue](images/features/debugger/5_button_continue.png) Continue
*	![Button Skip All Breakpoints](images/features/debugger/5_button_skip_all_breakpoints.png) Skip all breakpoints


###Example###

###Step 0 - Project Structure###


![Project](images/features/debugger/1_project.png)

**simple_service.js**:
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

**library_jslib**:
<pre><code>
exports.generateGuid = function() {
    var guid = ''+uuid.randomUUID();
    return guid;
};
</code></pre>

**require_service.js**:
<pre><code>
var guidGen = require('/DebuggerDemo/library');
var user = 'Test User';
var id = guidGen.generateGuid();

response.getWriter().println(user+", id "+id);
response.getWriter().flush();
response.getWriter().close();
</code></pre>

###Step 1 - Open Debug Perspective###

1. Click *other...* to list available perspectives.
<br></br>
![Perspectives](images/features/debugger/3_perspectives.png)
<br></br>
2. From the list, select *Debug*.
<br></br>
![Open Perspective](images/features/debugger/4_open_perspective.png)
<br></br>
3. The *Debug* perspective is open.
<br></br>
![Debugger Debug View](images/features/debugger/5_debugger_debug_view.png)


###Step 2 - Start Debugging###

1. From *Workspace Explorer*, select *simple_service.js*.
<br></br>
![Project](images/features/debugger/1_project.png)
<br></br>
2. Debugger was started and waits for user interaction.
<br></br>
![Debugger Start Session](images/features/debugger/7_debugger_start_session.png)
<br></br>
3. In the *Debug* view, press the *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button to list available debug sessions and select one.
<br></br>
![Debugger Select Session](images/features/debugger/8_debugger_select_session.png)
<br></br>
4. Press the *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png) button to continue with script execution.
<br></br>
![Debugger Step Into](images/features/debugger/9_debugger_step_into.png)
<br></br>
5. Set some *Breakpoints*.
6. Click on the line numbers on the left side of the opened editor.
7. Press the *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button to see *Breakpoints* that were set.
<br></br>
![Debugger Set Breakpoints](images/features/debugger/10_debugger_set_breakpoints.png)
<br></br>
8. Press the *Continue* ![Button Continue](images/features/debugger/5_button_continue.png) button to resume script execution to the next breakpoint.
<br></br>
![Debugger Continue](images/features/debugger/11_debugger_continue.png)
<br></br>
9. Press the *Continue* ![Button Continue](images/features/debugger/5_button_continue.png) button again.
<br></br>
![Debugger Continue](images/features/debugger/12_debugger_continue.png)
<br></br>
10. To exit the *Debug Session*, press the *Skip all breakpoints* ![Button Skip All Breakpoints](images/features/debugger/5_button_skip_all_breakpoints.png) button or continue pressing *Step Over* ![Button Step Over](images/features/debugger/5_button_step_over.png) or *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png) until the script execution finishes.


###Step 3 - Debugging Scripts Requiring Libraries###

1. From *Workspace Explorer*, select *require_service.js*. 
<br></br>
![Debugger Select Require Service](images/features/debugger/15_debugger_select_require_service.png)
<br></br>
![Debugger Start Session](images/features/debugger/16_debugger_start_session.png)
<br></br>
2. A new *Debug Session* is started.
3. Press the *Refresh* ![Button Refresh](images/features/debugger/5_button_refresh.png) button, select a session and 
press *Step Into* ![Button Step Into](images/features/debugger/5_button_step_into.png).
<br></br>
![Debugger Step Into](images/features/debugger/17_debugger_step_into.png)
<br></br>
4. Continue debugging.
<br></br>
![Debugger Step Into](images/features/debugger/18_debugger_step_into.png)
<br></br>
![Debugger Step Over](images/features/debugger/19_debugger_step_over.png)
<br></br>