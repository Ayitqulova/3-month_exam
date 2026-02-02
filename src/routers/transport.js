import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import roleGuard from "../middleware/role.guard.js"; 
import permissionGuard from "../middleware/permissionGuard.js"; 
import transportController from "../controller/transport.controller.js";

const router = Router();

router
    .post("/api/transport/:branch_id", checkToken, roleGuard("SuperAdmin"), permissionGuard("Transports", "create"), transportController.create)
    .get("/api/transport", checkToken, transportController.getAll)
    .put("/api/transport/:branch_id/:id", checkToken, roleGuard("SuperAdmin", "Admin"), permissionGuard("Transports", "update"), transportController.update)
    .delete("/api/transport/:branch_id/:id", checkToken, roleGuard("SuperAdmin"), permissionGuard("Transports", "delete"), transportController.delete);

export default router;