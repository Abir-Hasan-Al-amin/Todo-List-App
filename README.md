# Todo List App
It is a Todo List App. In this App User can create Tasks, Edit Tasks, and Delete tasks. These tasks will be saved in the Local Storage of the Browser even if the user closes their Browser or PC it will Remain. Until they manually cleared it.

Users can Create Tasks by clicking the Add Task Button. They can Write the task name and Give Priority to that Task. There are 3 types of Priority Low, Medium, and High. And they cannot Add it if the task name is empty.
Users can Delete tasks by clicking the Delete button. After Clicking it User needs to confirm it to delete the task.
By Clicking the Edit Button User can Edit the task name and priority.
Users can also check completed or not by clicking the check button.
All this will be stored automatically in local storage whenever the task changes via the useEffect hook. And Store all useState hook.
I did not use any state management tools(ContextApi, Redux ToolKit, etc) because it is too small an app to use this kind of tool.
It's a super simple app for Task Management.
