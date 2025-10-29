import { prisma } from "../utils/prisma.js"

export const GetUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(201).json(users);
    } catch (error) {
        res.status(404).json({ message: "Error get users" })
    }
}

export const GetUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userIndex = await prisma.user.findUnique({ where: { id } });
        res.status(201).json(userIndex);
    } catch (error) {
        res.status(404).json({ message: "Error get user" })
    }
}

export const CreateUser = async (req, res) => {
    const {
        name,
        email,
        password,
        age,
        city
    } = req.body;

    console.log({
        name,
        password,
        email,
        age,
        city
    })

    try {
        if (!name && !email && !password && !age && !city) {
            throw new Error("incomplete data!");
        }

        const newUser = await prisma.user.create({
            data: {
                "name": name,
                "email": email,
                password: password,
                age: age,
                city: city
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({ message: "Error create user" })
    }
};

export const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body

    try {
        const userIndex = await prisma.user.findUnique({ where: { id } });
        if (!userIndex) new Error("User not found");
        const updateUser = await prisma.user.update({
            where: { id },
            data,
        })

        if (!updateUser) throw new Error("User not updated");
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const DeleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userIndex = await prisma.user.findUnique({ where: { id } });
        if (!userIndex) throw new Error("User not found!");

        const deleteuser = await prisma.user.delete({ where: { id } });
        if (!deleteuser) throw new Error("Error process delete user");
        res.status(404).json(deleteuser)
    } catch(error) {
        res.status(404).json({ message: 'Error delete user' });
    }
};