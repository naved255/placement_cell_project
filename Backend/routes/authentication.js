import express from "express";
const router = express.Router();
import { checkProfile, companyRegister, login, officerRegister, registerUser, studentRegister } from "../controller/authentication.js";
import { authenticateToken, authorizeRole } from "../middleware.js";


router.post("/register",registerUser);
router.post("/register/student",authenticateToken,authorizeRole("student"),studentRegister);
router.get("/check/profile",authenticateToken,checkProfile)
router.post("/register/company",authenticateToken,authorizeRole("company"),companyRegister);
router.post("/register/officer",authenticateToken,authorizeRole("officer"),officerRegister)
router.post("/login",login);


export default router;