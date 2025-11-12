import { prisma } from "../utils/prisma.js"
import { ErrorHook, ValidationHook } from "../utils/TryCatchHook.js";

export class PropertyController {
    async AddProperty(req, res) {
        try {
            const {
                title,
                description,
                address,
                city,
                country,
                latitude,
                longitude,
                price,
                estimatedValue,
                tokenSymbol,
                totalTokens,
                ownerId,
            } = req.body;

            // Validación de campos
            const validationErrors = ValidationHook([
                { name: 'title', value: title, type: 'string', required: true, label: 'Title' },
                { name: 'description', value: description, type: 'string', required: true, label: 'Description' },
                { name: 'address', value: address, type: 'string', required: true, label: 'Address' },
                { name: 'city', value: city, type: 'string', required: true, label: 'City' },
                { name: 'country', value: country, type: 'string', required: true, label: 'Country' },
                { name: 'latitude', value: latitude, type: 'number', required: false, label: 'Latitude' },
                { name: 'longitude', value: longitude, type: 'number', required: false, label: 'Longitude' },
                { name: 'price', value: price, type: 'number', required: true, label: 'Price' },
                { name: 'estimatedValue', value: estimatedValue, type: 'number', required: true, label: 'Estimated Value' },
                { name: 'tokenSymbol', value: tokenSymbol, type: 'string', required: true, label: 'Token Symbol' },
                { name: 'totalTokens', value: totalTokens, type: 'number', required: true, label: 'Total Tokens' },
                { name: 'ownerId', value: ownerId, type: 'number', required: true, label: 'Owner ID' },
            ]);

            if (validationErrors.length > 0) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validationErrors
                });
            }

            const newProperty = await prisma.property.create({
                data: {
                    title,
                    description,
                    address,
                    city,
                    country,
                    latitude,
                    longitude,
                    price,
                    estimatedValue,
                    totalTokens,
                    tokenSymbol,
                    ownerId,
                    kyb: {
                        create: {
                            status: "PENDING",
                            documentsComplete: false,
                            legalVerified: false,
                            financialVerified: false,
                            technicalVerified: false,
                            riskLevel: 'MEDIUM',
                        }
                    },
                },
                include: {
                    kyb: true,
                }
            })

            res.status(201).json(newProperty);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async GetProperties(req, res) {
        try {
            const properties = await prisma.property.findMany({
                include: {
                    kyb: true,
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            });
            res.status(200).json(properties);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async GetProperty(req, res) {
        const { id } = req.params;

        try {
            const property = await prisma.property.findUnique({
                where: { id: parseInt(id) },
                include: {
                    kyb: true,
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    },
                    transactions: true,
                }
            });

            if (!property) {
                return res.status(404).json({
                    message: "Property not found",
                    errors: ["Property with provided ID does not exist"]
                });
            }

            res.status(200).json(property);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async UpdateProperty(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const property = await prisma.property.findUnique({
                where: { id: parseInt(id) }
            });

            if (!property) {
                return res.status(404).json({
                    message: "Property not found",
                    errors: ["Property with provided ID does not exist"]
                });
            }

            const updatedProperty = await prisma.property.update({
                where: { id: parseInt(id) },
                data,
                include: {
                    kyb: true,
                }
            });

            res.status(200).json(updatedProperty);
        } catch (error) {
            ErrorHook(error, res);
        }
    }

    async DeleteProperty(req, res) {
        const { id } = req.params;

        try {
            const property = await prisma.property.findUnique({
                where: { id: parseInt(id) }
            });

            if (!property) {
                return res.status(404).json({
                    message: "Property not found",
                    errors: ["Property with provided ID does not exist"]
                });
            }

            const deletedProperty = await prisma.property.delete({
                where: { id: parseInt(id) }
            });

            res.status(200).json({
                message: "Property deleted successfully",
                data: deletedProperty
            });
        } catch (error) {
            ErrorHook(error, res);
        }
    }
}