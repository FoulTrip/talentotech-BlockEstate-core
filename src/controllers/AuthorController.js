import { ErrorHook, ValidationHook } from "../utils/TryCatchHook.js";
import { prisma } from "../utils/prisma.js"

export class AuthorController {
    async CreateAuthor(req, res) {
        const {
            name,
            lastName,
            secondName,
            fullname,
            birthDate,
            birthPlace,
            deathDate,
            deathPlace,
            biography,
            shortBio,
            nationality,
            languages,
            genres,
            occupation,
            education,
            awards,
            email,
            website,
            socialMedia,
            isActive,
            isVerified,
            totalBooks,
            photoUrl,
            coverImageUrl,
            slug,
            searchText,
            views,
            popularity,
        } = req.body;

        try {
            const errors = ValidationHook([
                { name: 'name', value: name, type: 'string', required: true, label: 'Name' },
                { name: 'lastName', value: lastName, type: 'string', required: true, label: 'Last name' },
                { name: 'secondName', value: secondName, type: 'string', required: true, label: 'Second name' },
                { name: 'fullname', value: fullname, type: 'string', required: true, label: 'Fullname' },
                { name: 'birthDate', value: birthDate, type: 'date', required: true, label: 'Birth date' },
                { name: 'slug', value: slug, type: 'string', required: true, label: 'Slug' },
                { name: 'nationality', value: nationality, type: 'array', required: true, label: 'Nationality' },
                { name: 'languages', value: languages, type: 'array', required: true, label: 'Languages' },
                { name: 'genres', value: genres, type: 'array', required: true, label: 'Genres' },
                { name: 'occupation', value: occupation, type: 'array', required: true, label: 'Occupation' },
                // Campos opcionales con validación
                { name: 'email', value: email, type: 'email', required: false, label: 'Email' },
                { name: 'deathDate', value: deathDate, type: 'date', required: false, label: 'Death date' },
            ]);

            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors
                });
            }

            // Datos para crear el autor
            const authorData = {
                name,
                lastName,
                secondName,
                fullname,
                birthDate: new Date(birthDate),
                nationality,
                languages,
                genres,
                occupation,
                slug,
            };

            // Campos opcionales
            if (birthPlace) authorData.birthPlace = birthPlace;
            if (deathDate) authorData.deathDate = new Date(deathDate);
            if (deathPlace) authorData.deathPlace = deathPlace;
            if (biography) authorData.biography = biography;
            if (shortBio) authorData.shortBio = shortBio;
            if (education) authorData.education = education;
            if (awards) authorData.awards = awards;
            if (email) authorData.email = email;
            if (website) authorData.website = website;
            if (socialMedia) authorData.socialMedia = socialMedia;
            if (typeof isActive === 'boolean') authorData.isActive = isActive;
            if (typeof isVerified === 'boolean') authorData.isVerified = isVerified;
            if (typeof totalBooks === 'number') authorData.totalBooks = totalBooks;
            if (photoUrl) authorData.photoUrl = photoUrl;
            if (coverImageUrl) authorData.coverImageUrl = coverImageUrl;
            if (searchText) authorData.searchText = searchText;
            if (typeof views === 'number') authorData.views = views;
            if (typeof popularity === 'number') authorData.popularity = popularity;

            const newAuthor = await prisma.author.create({ data: authorData });
            res.status(201).json(newAuthor);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async GetAuthors(req, res) {
        try {
            const Authors = await prisma.author.findMany();
            res.status(200).json({
                message: "Users find successfully",
                data: Authors,
            });
        } catch (error) {
            ErrorHook(error);
        }
    }

    async GetAuthor(req, res) {
        const { id } = req.params;

        try {
            const AuthorIndex = await prisma.author.findUnique(
                { where: { id } }
            );

            if (!AuthorIndex) {
                return res.status(404).json({
                    message: "Author not found",
                    error: ["User with provided ID does not exist"]
                })
            }

            res.status(200).json({
                message: "Author find successfully",
                data: AuthorIndex,
            });
        } catch (error) {
            ErrorHook(error);
        }
    }

    async UpdateAuthor(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const authorIndex = await prisma.author.findUnique({ where: { id } });

            if (!authorIndex) {
                return res.status(404).json({
                    message: "Author not found",
                    error: ["User with provided ID does not exist"]
                })
            }

            const updatedAuthor = await prisma.author.update({
                where: { id },
                data,
            })

            res.status(200).json({
                message: "User updated successfully",
                data: updatedAuthor
            });
        } catch (error) {
            ErrorHook(error)
        }
    }

    async DeleteAuthor(req, res) {
        const { id } = req.params;

        try {
            const authorIndex = await prisma.author.findUnique({ where: { id } });

            if (!authorIndex) {
                return res.status(404).json({
                    message: "Author not found",
                    error: ["User with provided ID does not exist"]
                })
            }

            const deleteAuthor = await prisma.author.delete({ where: { id } });

            res.status(200).json({
                message: "User deleted successfully",
                data: deleteAuthor
            });
        } catch (error) {
            ErrorHook(error)
        }
    }
}