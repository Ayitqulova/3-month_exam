import pool from "../db/config.js";

const permissionGuard = (model, action) => {
    return async (req, res, next) => {
        try {
            // Superadmin bo'lsa darrov o'tkazib yuborish
            if (req.user.role === 'superadmin') return next();

            // Bazadan tekshirish: xodim IDsi va action (masalan: CREATE, READ)
            const result = await pool.query(
                "SELECT * FROM permissions WHERE staff_id = $1 AND action = $2",
                [req.user.id, action.toUpperCase()]
            );

            if (result.rowCount > 0) return next();

            return res.status(403).json({
                success: false,
                message: `Sizda ${model} uchun ${action} huquqi yo'q! ❌`
            });
        } catch (error) {
            next(error);
        }
    };
};

export default permissionGuard;