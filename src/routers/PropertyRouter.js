import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController.js";

const propertyRouter = Router();
const PropertyService = new PropertyController();
const {
    AddProperty,
    GetProperties,
    GetProperty,
    UpdateProperty,
    DeleteProperty,
} = PropertyService;

propertyRouter.post("/", AddProperty);
propertyRouter.get("/", GetProperties);
propertyRouter.get("/:id", GetProperty);
propertyRouter.put("/:id", UpdateProperty);
propertyRouter.delete("/:id", DeleteProperty);

export default propertyRouter;
