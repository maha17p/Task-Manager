const express = require("express");
const { 
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,removeTask
 } = require("../controller/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(removeTask)

module.exports = router;
