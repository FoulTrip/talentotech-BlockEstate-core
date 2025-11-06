import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const authorRouter = Router();
const AuthorService = new AuthorController();
const {
    GetAuthors,
    GetAuthor,
    CreateAuthor,
    UpdateAuthor,
    DeleteAuthor,
} = AuthorService;

authorRouter.get("/", GetAuthors);
authorRouter.get("/:id", GetAuthor);

authorRouter.post("/", authMiddleware, CreateAuthor);
authorRouter.put("/:id", authMiddleware, UpdateAuthor);
authorRouter.delete("/:id", authMiddleware, DeleteAuthor);

export default authorRouter;