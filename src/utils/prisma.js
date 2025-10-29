import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());

export const IsConnectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB Connect Successfully!")
    } catch (error) {
        console.log("DB no connect!")
    }
}