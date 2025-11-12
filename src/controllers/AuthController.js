import { createSigner } from "fast-jwt";
import { prisma } from "../utils/prisma.js"
import bcrypt from "bcrypt"
import { ErrorHook, ValidationHook } from "../utils/TryCatchHook.js";
import { GenerateWalletAddress } from "../utils/GenerateWalletAddress.js";

export class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) throw new Error("User not found");

            const isValidPassword = bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error("Password not valid!");

            const signSync = createSigner({
                key: process.env.TOKEN_PASS,
                expiresIn: 86400000,
            })

            const token = signSync({
                userId: user.id,
                email: user.email,
            });

            res.status(201).json({ token });
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async register(req, res) {
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

            const salt = bcrypt.genSaltSync();
            const hashPassword = bcrypt.hashSync(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                    age,
                    city,
                    walletAddress: GenerateWalletAddress(),
                    kyc: {
                        create: {
                            status: "PENDING",
                        }
                    }
                }
            });

            const signSync = createSigner({
                key: process.env.TOKEN_PASS,
                expiresIn: 86400000,
            })

            const token = signSync({
                userId: newUser.id,
                email: newUser.email,
            });

            res.status(201).json({ token });
        } catch (error) {
            ErrorHook(error, res);
        }
    };
}