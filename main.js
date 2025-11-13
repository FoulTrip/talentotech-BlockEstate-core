import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import { IsConnectDB } from "./src/utils/prisma.js";
import cors from "cors"
import morgan from "morgan";

import userRouter from "./src/routers/UserRouter.js";
import authRouter from "./src/routers/AuthRouter.js";
import propertyRouter from "./src/routers/PropertyRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan("dev"));
IsConnectDB();

const port = process.env.PORT || 3000;

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

// Custom Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/property", propertyRouter);

// Swagger Config
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});