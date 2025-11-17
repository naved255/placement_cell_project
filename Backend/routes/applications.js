import express from "express";
const router = express.Router();
import db from "../init/index.js";
import { getAllApplications,getJobApplications, getStudentApplication, newApplication, updateStatus } from "../controller/applications.js";
import { authenticateToken, authorizeRole, checkEligibility, isApplied } from "../middleware.js";

router.get("/get",getAllApplications);
router.get("/get/:jobId", getJobApplications);
router.post("/new",authenticateToken,authorizeRole("student"), isApplied, checkEligibility,newApplication);
router.get("/student",authenticateToken,authorizeRole("student"),getStudentApplication);
router.post("/update/status",authenticateToken,authorizeRole("company"),updateStatus);

export default router;