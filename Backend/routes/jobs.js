import express from "express";
const router = express.Router();

import {authenticateToken, authorizeRole, }  from "../middleware.js";
import { addNewJob, getAllJobs, getJobByCompany, updateStatus } from "../controller/jobs.js";

router.get("/get",getAllJobs);
router.get("/company",authenticateToken,authorizeRole("company"),getJobByCompany);
router.post("/postJob",authenticateToken,authorizeRole("company"),addNewJob);
router.post("/update/status/:id",authenticateToken,authorizeRole("officer"),updateStatus)


export default  router;