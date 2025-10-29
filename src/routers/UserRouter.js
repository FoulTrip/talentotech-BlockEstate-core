import { Router } from "express";
import {
    GetUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
    GetUser,
} from "../controllers/UserController.js"

const userRouter = Router();

userRouter.get("/", GetUsers);
userRouter.get("/:id", GetUser);
userRouter.post("/", CreateUser);
userRouter.put("/:id", UpdateUser);
userRouter.delete("/:id", DeleteUser);

export default userRouter;