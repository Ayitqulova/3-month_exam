import UserService from "../services/staff.service.js";
import pool from "../db/config.js";

class StaffController {
    async register(req, res, next) {
        try {
            const data = await UserService.register(req.body, next);
            if (data) return res.status(data.status).json(data);
        } catch (error) { next(error); }
    }

    async verify(req, res, next) {
        try {
            const data = await UserService.verify(req.body, next);
            if (data) return res.status(data.status).json(data);
        } catch (error) { next(error); }
    }

    async login(req, res, next) {
        try {
            const data = await UserService.login(req.body, next);
            if (data) return res.status(data.status).json(data);
        } catch (error) { next(error); }
    }

    async givePermissions(req, res, next) {
        try {
            const { staff_id, actions, permission_model } = req.body; 

        
            await pool.query("DELETE FROM permissions WHERE staff_id = $1", [staff_id]);

            for (let action of actions) {
                await pool.query(
                    "INSERT INTO permissions (staff_id, permission_model, action) VALUES ($1, $2, $3)",
                    [staff_id, permission_model, action.toUpperCase()]
                );
            }

            return res.status(200).json({
                success: true,
                message: `Xodimga ${permission_model} uchun [${actions}] huqudlari berildi ✅`
            });
        } catch (error) { next(error); }
    }
    async getAllStaff(req, res, next) {
        try {
            const data = await UserService.getAllStaff(req, res, next);
        } catch (error) { next(error); }
    }


async updateStaff(req, res, next) {
    try {
        const data = await UserService.updateStaff(req.params.id, req.body, next);
        if (data) return res.status(data.status).json(data);
    } catch (error) { next(error); }
}

async deleteStaff(req, res, next) {
    try {
        const data = await UserService.deleteStaff(req.params.id, next);
        if (data) return res.status(data.status).json(data);
    } catch (error) { next(error); }
}
}

export default new StaffController();