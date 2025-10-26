import express from "express";
const router = express.Router();
import db from "../init/index.js";
import { getAllApplications, getStudentApplication, newApplication, updateStatus } from "../controller/applications.js";
import { authenticateToken, authorizeRole, checkEligibility } from "../middleware.js";

router.get("/get",getAllApplications);
router.post("/new",authenticateToken,authorizeRole("student"),checkEligibility,newApplication);
router.get("/student",authenticateToken,authorizeRole("student"),getStudentApplication);
router.post("/update/status",authenticateToken,authorizeRole("company"),updateStatus)

export default router;