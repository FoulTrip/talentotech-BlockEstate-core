import { prisma } from "../utils/prisma.js"
import { ErrorHook, ValidationHook } from "../utils/TryCatchHook.js";

export class BookController {
    async GetBooks(req, res) {
        try {
            const books = await prisma.book.findMany({
                include: {
                    author: true,
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            });
            if (!books) throw new Error("Error obteniendo lista de libros");
            res.status(200).json(books)
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async AddBookToAuthor(req, res) {
        try {
            const {
                name,
                description,
                authorId,
                categories,
                genre,
                language,
                publishedDate,
                publisher,
                isbn,
                pageCount,
                format,
                coverImage,
                price,
                stock,
                rating,
            } = req.body;

            // Verificar que el autor existe
            const authorExists = await prisma.author.findUnique({
                where: { id: authorId }
            });

            if (!authorExists) {
                return res.status(404).json({ message: "Author not found" });
            }

            // Preparar datos del libro
            const BookData = {
                name,
                description,
                authorId,
                genre,
                language,
                publishedDate: publishedDate ? new Date(publishedDate) : null,
                publisher,
                isbn,
                pageCount,
                format,
                coverImage,
                price,
                stock,
                rating,
                categories
            }

            // Crear el libro
            const addBook = await prisma.book.create({ data: BookData });

            res.status(201).json(addBook);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async GetBooksByAuthorId(req, res) {
        try {
            const { authorId } = req.params;
            if (!authorId) {
                return res.status(400).json({ message: "Author ID is required" });
            }

            const books = await prisma.book.findMany({
                where: { authorId },
            });

            res.status(200).json(books);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async GetBookById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }

            const book = await prisma.book.findUnique({
                where: { id },
            });

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            res.status(200).json(book);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async UpdateBook(req, res) {
        try {
            const { id } = req.params;
            const {
                name,
                description,
                authorId,
                categories,
                genre,
                language,
                publishedDate,
                publisher,
                isbn,
                pageCount,
                format,
                coverImage,
                price,
                stock,
                rating,
            } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }

            // Validar campos básicos
            const errors = ValidationHook(
                { name: 'name', value: name, type: 'string', required: true, label: 'Name' },
                { name: 'authorId', value: authorId, type: 'string', required: true, label: 'Author ID' }
            );

            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors
                });
            }

            // Verificar que el libro existe
            const existingBook = await prisma.book.findUnique({
                where: { id }
            });
            if (!existingBook) {
                return res.status(404).json({ message: "Book not found" });
            }

            // Verificar que el autor existe si se está cambiando
            if (authorId !== existingBook.authorId) {
                const authorExists = await prisma.author.findUnique({
                    where: { id: authorId }
                });
                if (!authorExists) {
                    return res.status(404).json({ message: "Author not found" });
                }
            }

            // Preparar datos de actualización
            const updateData = {
                name,
                description,
                authorId,
                genre,
                language,
                publishedDate: publishedDate ? new Date(publishedDate) : null,
                categories,
                publisher,
                isbn,
                pageCount,
                format,
                coverImage,
                price,
                stock,
                rating,
            };

            // Actualizar el libro
            const updatedBook = await prisma.book.update({
                where: { id },
                data: updateData,
            });

            res.status(200).json(updatedBook);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async DeleteBook(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }

            // Verificar que el libro existe
            const existingBook = await prisma.book.findUnique({
                where: { id }
            });
            if (!existingBook) {
                return res.status(404).json({ message: "Book not found" });
            }

            // Eliminar las relaciones de categorías primero
            await prisma.bookOnCategory.deleteMany({
                where: { bookId: id }
            });

            // Eliminar el libro
            await prisma.book.delete({
                where: { id }
            });

            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            ErrorHook(error, res);
        }
    }
}
