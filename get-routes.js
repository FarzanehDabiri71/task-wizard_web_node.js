import express from "express";

import Task from "./Task.js";

const router = express.Router();

router.get("/", (req, res) => {
  const tasks = Task.getAllTasks();

  res.send(`<!DOCTYPE html>
<html lang="en" dir="rtl" >
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/style.css" />

    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <h1 class="text-center mt-3">Task Manager App</h1>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <form id="taskForm" action="/add-task" method="POST" class="p-2 rounded-3 border">
            <div class="input-group input-group-lg">
              <input
                type="text"
                class="form-control shadow-none"
                name="title"
                placeholder="Enter a new title" />
              <button type="submit" class="btn btn-primary">Add new Task</button>
            </div>
            <div class="form-check mt-1 mb-0" style="display: flex; align-items: center; justify-content: flex-start; direction: ltr;">
            <input
              type="checkbox"
              name="completed"
              class="form-check-input shadow-none"
              id="my-checkbox"
              style="margin-right: 0.5rem;" />
            <label class="form-check-label user-select-none" for="my-checkbox">
              The task is completed.
            </label>
</div>

          </form>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <ul class="list-group lh-lg p-0" style='direction: ltr;'>
         ${tasks
           .map(
             (task, index) => `
             <li class="list-group-item d-flex bg-light" key="${task.id}">
      <span class="flex-grow-1 d-flex align-items-center  justify-content-between">
        <label >${task.title}</label>
        <span class="badge ${
          task.completed ? "bg-success" : "bg-secondary"
        } mr-auto me-3 user-select-none"> ${task.completed ? "Completed" : "In progress"} </span>
      </span>

      <button class="btn btn-sm  ${
        task.completed ? "btn-secondary" : "btn-success"
      }  me-3 toggle-btn">Toggle</button>
      <button class="btn btn-sm btn-primary me-3 edit-btn">Edit</button>
      <button class="btn btn-sm btn-danger me-3 delete-btn">Delete</button>
    </li>
  `
           )
           .join("")}
           
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>
`);
});

export default router;
