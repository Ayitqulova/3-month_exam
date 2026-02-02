import { Router } from "express";
const router = Router();
import checkToken from "../middleware/checkToken.js";
import roleGuard from "../middleware/role.guard.js"; 
import permissionGuard from "../middleware/permissionGuard.js";
import branchController from "../controller/branch.controller.js";



router
    .post("/api/branch", checkToken, roleGuard("SuperAdmin"), permissionGuard("Branches", "create"), branchController.create)
    .get("/api/branch", checkToken, branchController.getAll)
    .put("/api/branch/:id", checkToken, roleGuard("SuperAdmin", "Admin"), permissionGuard("Branches", "update"), branchController.update)
    .delete("/api/branch/:id", checkToken, roleGuard("SuperAdmin"), permissionGuard("Branches", "delete"), branchController.delete);

export default router;