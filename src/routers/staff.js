import {Router} from "express"
import validation from "../middleware/validation.js"
import staffController from "../controller/staff.controller.js"
const router = Router()

router
    .post("/api/register", validation.register, staffController.register)
    .post("/api/verify",staffController.verify)

    // .post("/api/login", validation, StaffController.login)
    // .get("/api/staff", userController.getAllStaff)

export default router