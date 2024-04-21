#! /usr/bin/env node 
import inquirer from "inquirer";
//array of Objetcts
let taskList = [];
//view all assign tasks
let viewTasks = function (list) {
    console.log("*****Your Current Tasks*****");
    list.forEach((e, index) => console.log(`${index + 1} : ${e.task} -- [${e.taskDate}]`));
};
// new task function that return arry of objects
let newTask = function (task, date) {
    taskList.push({ task: task, taskDate: date });
    return 'Updated successfully...';
};
// Delete task function based on task date
let delTask = function (date, list) {
    let flag = false;
    list.forEach((e, index) => {
        if (e.taskDate === date) {
            delete list[index];
            console.log('Successfully Deleted');
            flag = true;
        }
    });
    if (flag === false) {
        console.log('Date not Correct...');
    }
};
// search task function
let searchTask = function (date, list) {
    let flag = false;
    list.forEach((e, index) => {
        if (e.taskDate === date) {
            flag = true;
            console.log(`${index + 1} :${e.task} --[${e.taskDate}]`);
        }
    });
    if (flag === false) {
        console.log("Sorry! No task found");
    }
};
// user options switching
let flag = true;
while (flag) {
    // user data collection
    let answers = await inquirer.prompt([
        {
            message: "What do you want to perform : ",
            type: "list",
            name: "options",
            choices: [
                "Create Task",
                "Delete Task",
                "Search Task",
                "View Tasks",
                "Exit App",
            ],
        },
    ]);
    switch (answers.options) {
        // create task
        case "Create Task": {
            let userTasks = await inquirer.prompt([
                {
                    message: "Note down your task :",
                    type: "string",
                    name: "task",
                },
                {
                    message: "Plz Enter Task Date in correct format '2020-03-02' :",
                    type: "string",
                    name: "taskDate",
                },
            ]);
            console.log(newTask(userTasks.task, userTasks.taskDate));
            break;
        }
        // delete task
        case "Delete Task": {
            let askDate = await inquirer.prompt([
                {
                    message: "Plz provide date of task in correct format like '2020-09-08' :",
                    type: "string",
                    name: "date",
                },
            ]);
            delTask(askDate.date, taskList);
            break;
        }
        case "Search Task": {
            let askDate = await inquirer.prompt([
                {
                    message: "Plz provide date of task in correct format like '2020-09-08' :",
                    type: "string",
                    name: "date",
                },
            ]);
            searchTask(askDate.date, taskList);
            break;
        }
        case "View Tasks": {
            viewTasks(taskList);
            break;
        }
        case "Exit App":
            console.log("Thanks! For Using App");
            flag = false;
            break;
    }
}
