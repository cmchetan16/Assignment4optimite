const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");
const { createUse, logIn } = require("../controllers/userController");
const {
  createTask,
  getTask,
  getTaskDetail,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/register", createUse);
router.post("/login", logIn);

router.post("/user/:userId/task/create", authentication, createTask);
router.get("/user/:userId/tasks", authentication, getTask);
router.get("/user/:userId/task/:taskId", authentication, getTaskDetail);
router.put("/user/:userId/task/:taskId", authentication, updateTask);
router.delete("/user/:userId/task/:taskId", authentication, deleteTask);

router.all("/*", (req, res) => {
  res.status(400).send({ status: false, message: "end point is nt correct" });
});

module.exports = router;
