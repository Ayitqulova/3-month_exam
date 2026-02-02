import { Router } from "express";
import validation from "../middleware/validation.js";
import staffController from "../controller/staff.controller.js";
import checkToken from "../middleware/checkToken.js";
import roleGuard from "../middleware/role.guard.js";

const router = Router();

router.post("/api/register", validation.register, staffController.register);
router.post("/api/verify", staffController.verify);
router.post("/api/login", validation.login, staffController.login);
router.get("/api/staff", checkToken, staffController.getAllStaff);

//Admin
router.post("/api/staff/permissions", checkToken, roleGuard("SuperAdmin"), staffController.givePermissions);
router.put("/api/staff/:id", checkToken, roleGuard("SuperAdmin"), staffController.updateStaff);
router.delete("/api/staff/:id", checkToken, roleGuard("SuperAdmin"), staffController.deleteStaff);




export default router;