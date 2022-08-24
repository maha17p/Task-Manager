const Task = require("../model/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError( `No task with id:${taskID}`,404))
  }
  res.status(200).json({ task });
});

const removeTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError( `No task with id:${taskID}`,404))
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError( `No task with id:${taskID}`,404))
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  removeTask,
};
