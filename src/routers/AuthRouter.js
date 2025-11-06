import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

const {
    login,
    register,
} = authController;

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter