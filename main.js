import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import { IsConnectDB } from "./src/utils/prisma.js";
import cors from "cors"

import userRouter from "./src/routers/UserRouter.js";
import authorRouter from "./src/routers/AuthorRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
IsConnectDB();

const port = process.env.PORT | 3000;

// Custom Routers
app.use("/user", userRouter);
app.use("/author", authorRouter);

// Swagger Config
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});