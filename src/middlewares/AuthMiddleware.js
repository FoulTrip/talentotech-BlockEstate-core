import { createVerifier } from "fast-jwt";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(' ')[1];

        const verifySync = createVerifier({
            key: process.env.TOKEN_PASS
        });

        const payload = verifySync(token);

        // Adjuntar información del usuario al request
        req.user = {
            userId: payload.userId,
            email: payload.email
        };

        next();
    } catch (error) {
        if (error.code === 'FAST_JWT_EXPIRED') {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}