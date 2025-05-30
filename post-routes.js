import express from "express";
import Task from "./Task.js";

const router = express.Router();

router.post("/add-task", (req, res, next) => {
  if (req.body.title) {
    const title = req.body.title;
    const completed = req.body.completed === "on" ? true : false;
    try {
      const task = new Task(title, completed);
      task.save();
      res.redirect("/");
    } catch (error) {
      res.status(400).send(`<h1>${error.message}</h1><p>There was an error saving the task.</p>`);
    }
  } else {
    res.status(400).send(`<h1>Invalid Request</h1><p>Title is required.</p>`);
  }
});

router.post("/toggle-task", (req, res) => {
  if (req.body.id) {
    const task = Task.getTaskById(req.body.id);
    if (task) {
      // console.log(task);
      task.completed = !task.completed;
      task.save();
      res.json(true);
    } else {
      res.status(404).json(404);
    }
  } else {
    res.status(400).json(400);
  }
});

export default router;
