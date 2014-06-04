---
layout: help
---

Debug
===

The toolkit offers Debugging functionallity. The goal is to easy the developers in the hunt of server side bugs.

Debug Perspective
---
!images/features/debugger/5_debugger_debug_view.png!
* *Sessions* - contains all debug execution sessions.
* *Variables/Values* - contains variables and their values, available in the current scope of execution.
* *File/Row/Source* - contains inforamation about in witch file and witch row, a *Breakpoint* is set. 

h2. Available Commands
* !images/features/debugger/5_button_refresh.png! Refresh
* !images/features/debugger/5_button_step_into.png! Step Into
* !images/features/debugger/5_button_step_over.png! Step Over
* !images/features/debugger/5_button_continue.png! Continue
* !images/features/debugger/5_button_skip_all_breakpoints.png! Skip all breakpoints

h2. Debugging Example
h4. Step 0 - Project Structure

!images/features/debugger/1_project.png!

*simple_service.js*
{code}
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
{code}

*library_jslib*
{code}
exports.generateGuid = function() {
    var guid = ''+uuid.randomUUID();
    return guid;
};
{code}

*require_service.js*
{code}
var guidGen = require('/DebuggerDemo/library');
var user = 'Test User';
var id = guidGen.generateGuid();

response.getWriter().println(user+", id "+id);
response.getWriter().flush();
response.getWriter().close();
{code}

h4. Step 1 - Open Debug Perspective

Click *other...* to list available perspectives

!images/features/debugger/3_perspectives.png!

From the list select *Debug* perspective

!images/features/debugger/4_open_perspective.png!

Now *Debug* perspective is opened

!images/features/debugger/5_debugger_debug_view.png!

h4. Step 2 - Start Debugging

Select *simple_service.js* from *Workspace Explorer*

!images/features/debugger/1_project.png!

Debugger was started and waits for user interaction

!images/features/debugger/7_debugger_start_session.png!

In the *Debug* view press *Refresh* !images/features/debugger/5_button_refresh.png! button to list available *Debug Sessions* and select one.

!images/features/debugger/8_debugger_select_session.png!

Press *Step Into* !images/features/debugger/5_button_step_into.png! button to continue script's execution.

!images/features/debugger/9_debugger_step_into.png!

Let's set some *Breakpoints*.
Click on the line numbers on the left of the opened editor.
Press *Refresh* !images/features/debugger/5_button_refresh.png! button to see *Breakpoints* that were set.

!images/features/debugger/10_debugger_set_breakpoints.png!

Press *Continue* !images/features/debugger/5_button_continue.png! button to resume script's execution to the next *Breakpoint*.

!images/features/debugger/11_debugger_continue.png!

Press *Continue* !images/features/debugger/5_button_continue.png! button again.

!images/features/debugger/12_debugger_continue.png!

To exit *Debug Session* press *Skip all breakpoints* !images/features/debugger/5_button_skip_all_breakpoints.png! button 
or continue pressing *Step Over* !images/features/debugger/5_button_step_over.png! or *Step Into* !images/features/debugger/5_button_step_into.png! buttons until script's execution finish.

h4. Step 3 - Debugging Scripts Requiring Libraries

Select *require_service.js* from *Workspace Explorer*

!images/features/debugger/15_debugger_select_require_service.png!

!images/features/debugger/16_debugger_start_session.png!

A new *Debug Session* was started.
Press *Refresh* !images/features/debugger/5_button_refresh.png! button, select session and press *Step Into* !images/features/debugger/5_button_step_into.png! button.

!images/features/debugger/17_debugger_step_into.png!

Continue debugging.

!images/features/debugger/18_debugger_step_into.png!

!images/features/debugger/19_debugger_step_over.png!
