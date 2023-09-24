const taskModel = require("../models/taskModel");

const {
  isValidBody,
  isValid,
  isValidTitle,
  isValidDescription,
  isvalidDuedate,
  isValidObjectId,
} = require("../utils/validation");

const createTask = async (req, res) => {
  try {
    let userId = req.params.userId;
    let userVerify = req.authUser;
    if (userId !== userVerify)
      return res.status(401).send({ status: false, message: "Unauthorised User" });
    let data = req.body;

    let { title, description, status, duedate } = data;

    if (!isValidBody(data))
      return res
        .status(401)
        .send({ status: false, message: "Body can't be empty" });

    if (!isValid(title))
      return res
        .status(401)
        .send({ status: false, message: "Please enter title for task" });
    if (!isValidTitle(title))
      return res
        .status(401)
        .send({
          status: false,
          message: "Please enter title in correct format",
        });

    if (!isValid(description))
      return res
        .status(401)
        .send({ status: false, message: "Please enter description for task" });

    if (!isValidDescription(description))
      return res
        .status(401)
        .send({
          status: false,
          message: "Please enter description in correct format",
        });

    if (!["in progress", "pending", "completed"].includes(status))
      return res.status(406).send({
        status: false,
        msg: "you can use only [in progress, pending, completed] in status",
      });

    let parts = duedate.split("-");
    let date = new Date(parts[2], parts[1] - 1, parts[0]);

    duedate = date.getTime() + 19800000;
    if (!duedate)
      return res
        .status(401)
        .send({
          status: false,
          message: "Please enter duedate in correct format",
        });

    const taskDetails = { title, description, status, duedate, userId };
    const savedTask = await taskModel.create(taskDetails);

    res.status(201).send({ status: true, message: "Success", data: savedTask });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    let userId = req.params.userId;
    let userVerify = req.authUser;
    if (userId !== userVerify)
      return res.status(401).send({ status: false, message: "Unauthorised User" });

    const checkUser = await taskModel.find({ userId: userId });
    if (checkUser.length === 0)
      return res.status(404).send({ status: false, message: "No task found" });

    return res.status(200).send({ status: true, data: checkUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getTaskDetail = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    if (!isValidObjectId(taskId))
      return res.status(404).send({ status: false, message: "Wrong task id" });
    let userId = req.params.userId;
    let userVerify = req.authUser;
    if (userId !== userVerify)
      return res.status(401).send({ status: false, message: "Unauthorised User" });

    const checkTask = await taskModel.findOne({
      _id: taskId,
      isDeleted: false,
      userId: userId,
    });
    if (!checkTask)
      return res.status(404).send({ status: false, message: "No task found" });

    return res.status(201).send({ status: true, data: checkTask });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

///////////////////////////////////////////////////

const updateTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;

    let userId = req.params.userId;
    let userVerify = req.authUser;
    if (userId !== userVerify)
      return res.status(401).send({ status: false, message: "Unauthorised User" });

    const checkTask = await taskModel.findOne({
      _id: taskId,
      isDeleted: false,
      userId: userId,
    });
    if (!checkTask)
      return res.status(404).send({ status: false, message: "No task found" });

    const data = req.body;
    const { title, description, duedate, status } = data;

    if (!isValidBody(data))
      return res
        .status(401)
        .send({ status: false, message: "Body can't be empty" });

    if (title) {
      if (!isValidTitle(title))
        return res
          .status(401)
          .send({
            status: false,
            message: "Please enter title in correct format",
          });
    }

    if (description) {
      if (!isValidDescription(description))
        return res
          .status(401)
          .send({
            status: false,
            message: "Please enter description in correct format",
          });
    }

    if (duedate) {
      let parts = duedate.split("-");
      let date = new Date(parts[2], parts[1] - 1, parts[0]);

      duedate = date.getTime() + 19800000;
      if (!duedate)
        return res
          .status(401)
          .send({
            status: false,
            message: "Please enter duedate in correct format",
          });
    }

    if (status) {
      if (!["in progress", "pending", "completed"].includes(status))
        return res.status(406).send({
          status: false,
          msg: "you can use only [in progress, pending, completed] in status",
        });
    }

    const updateTask = await taskModel.findByIdAndUpdate(
      taskId,
      { $set: data },
      { new: true }
    );

    res.status(201).send({
      status: true,
      message: "Task updated successfully",
      data: updateTask,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

////////////////////////////////////

const deleteTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;

    let userId = req.params.userId;
    let userVerify = req.authUser;
    if (userId !== userVerify)
      return res.status(401).send({ status: false, message: "Unauthorised User" });

    const checkTask = await taskModel.findOne({
      isDeleted: false,
      _id: taskId,
      userId: userId,
    });
    if (!checkTask)
      return res.status(404).send({ status: false, message: "No task found" });

    const deleteTask = await taskModel.findOneAndUpdate(
      { _id: taskId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    res
      .status(200)
      .send({
        status: true,
        message: "Task deleted successfully",
        data: deleteTask,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createTask, getTask, getTaskDetail, updateTask, deleteTask };
