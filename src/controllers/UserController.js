import { prisma } from "../utils/prisma.js"
import bcrypt from "bcrypt"
import { ErrorHook, ValidationHook } from "../utils/TryCatchHook.js"

export class UserController {
    GetUsers = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    GetUser = async (req, res) => {
        const { id } = req.params;

        try {
            const userIndex = await prisma.user.findUnique({ where: { id } });

            if (!userIndex) {
                return res.status(404).json({
                    message: "User not found",
                    errors: ["User with provided ID does not exist"]
                });
            }

            res.status(200).json(userIndex);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    CreateUser = async (req, res) => {
        const {
            name,
            email,
            password,
            age,
            city
        } = req.body;

        try {
            const errors = ValidationHook([
                { name: 'name', value: name, type: 'string', required: true, label: 'Name' },
                { name: 'email', value: email, type: 'email', required: true, label: 'Email' },
                { name: 'password', value: password, type: 'string', required: true, label: 'Password' },
                { name: 'age', value: age, type: 'number', required: true, label: 'Age' },
                { name: 'city', value: city, type: 'string', required: true, label: 'City' },
            ]);

            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                    age,
                    city
                }
            });

            res.status(201).json(newUser);
        } catch (error) {
            ErrorHook(error, res);
        }
    };

    UpdateUser = async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const userIndex = await prisma.user.findUnique({ where: { id } });

            if (!userIndex) {
                return res.status(404).json({
                    message: "User not found",
                    errors: ["User with provided ID does not exist"]
                });
            }

            const updateUser = await prisma.user.update({
                where: { id },
                data,
            });

            res.status(200).json(updateUser);
        } catch (error) {
            ErrorHook(error, res);
        }
    };

    DeleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            const userIndex = await prisma.user.findUnique({ where: { id } });

            if (!userIndex) {
                return res.status(404).json({
                    message: "User not found",
                    errors: ["User with provided ID does not exist"]
                });
            }

            const deleteUser = await prisma.user.delete({ where: { id } });

            res.status(200).json({
                message: "User deleted successfully",
                data: deleteUser
            });
        } catch (error) {
            ErrorHook(error, res);
        }
    };
}