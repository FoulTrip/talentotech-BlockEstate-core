import { Router } from "express";
import { UserController } from "../controllers/UserController.js"

const userRouter = Router();
const UserService = new UserController();
const {
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
} = UserService;

userRouter.get("/", GetUsers);
userRouter.get("/:id", GetUser);
userRouter.put("/:id", UpdateUser);
userRouter.delete("/:id", DeleteUser);

export default userRouter;