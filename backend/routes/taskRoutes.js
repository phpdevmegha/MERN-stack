import e from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/TaskController.js";

const router  = e.Router();

router.route("/")
    .get(getTasks)
    .post(createTask);

router.route("/:id")
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);
export default router;