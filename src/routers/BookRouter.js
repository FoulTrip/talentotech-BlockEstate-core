import { Router } from "express";
import { BookController } from "../controllers/BookController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const bookRouter = Router();
const BookService = new BookController();
const {
    GetBooks,
    AddBookToAuthor,
    GetBooksByAuthorId,
    GetBookById,
    UpdateBook,
    DeleteBook,
} = BookService;

// Rutas para libros
bookRouter.get("/", GetBooks);
bookRouter.get("/author/:authorId", GetBooksByAuthorId);
bookRouter.get("/:id", GetBookById);

bookRouter.post("/", authMiddleware, AddBookToAuthor);
bookRouter.put("/:id", authMiddleware, UpdateBook);
bookRouter.delete("/:id", authMiddleware, DeleteBook);

export default bookRouter;