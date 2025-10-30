/**
 * Maneja errores de Prisma y del servidor
 * @param {Error} error - Error capturado
 * @param {Object} res - Objeto de respuesta de Express
 */
export function ErrorHook(error, res) {
    // Manejo de errores específicos de Prisma
    if (error.code === 'P2002') {
        return res.status(409).json({
            message: "Conflict",
            errors: [`${error.meta.target[0]} already exists`]
        });
    }

    console.error("Error creating author:", error);
    res.status(500).json({
        message: "Error creating author",
        errors: [error.message]
    });
}

/**
 * Valida campos según tipo y requisitos
 * @param {Array} fields - Array de objetos con propiedades: name, value, type, required, label
 * @returns {Array} Array de mensajes de error
 */
export function ValidationHook(fields) {
    const errors = [];

    fields.forEach(field => {
        const { name, value, type, required, label } = field;

        if (required) {
            // Validación para strings
            if (type === 'string') {
                if (!value || value.trim() === '') {
                    errors.push(`${label || name} is required`);
                }
            }

            // Validación para arrays
            if (type === 'array') {
                if (!value || !Array.isArray(value) || value.length === 0) {
                    errors.push(`${label || name} is required and must be an array`);
                }
            }

            // Validación para números
            if (type === 'number') {
                if (value === undefined || value === null) {
                    errors.push(`${label || name} is required`);
                }
            }

            // Validación para booleanos
            if (type === 'boolean') {
                if (typeof value !== 'boolean') {
                    errors.push(`${label || name} is required and must be a boolean`);
                }
            }

            // Validación para fechas
            if (type === 'date') {
                if (!value) {
                    errors.push(`${label || name} is required`);
                } else if (isNaN(Date.parse(value))) {
                    errors.push(`${label || name} must be a valid date`);
                }
            }

            // Validación para emails
            if (type === 'email') {
                if (!value || value.trim() === '') {
                    errors.push(`${label || name} is required`);
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.push(`${label || name} must be a valid email`);
                }
            }
        }

        // Validaciones opcionales cuando el campo tiene valor
        if (value && !required) {
            if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.push(`${label || name} must be a valid email`);
            }

            if (type === 'date' && isNaN(Date.parse(value))) {
                errors.push(`${label || name} must be a valid date`);
            }
        }
    });

    return errors;
}