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