import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController.js";

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
authorRouter.post("/", CreateAuthor);
authorRouter.put("/:id", UpdateAuthor);
authorRouter.delete("/:id", DeleteAuthor);

export default authorRouter;