import express from "express";
const router = express.Router();
import db from "../init/index.js";

import { authenticateToken, authorizeRole, } from "../middleware.js";
import {  editCompany, getAllCompanies, getCompanyById, updateStatusCompany,  } from "../controller/companies.js";

router.get("/get",getAllCompanies);
router.get("/profile",authenticateToken,authenticateToken,getCompanyById);
router.post("/update",authenticateToken,authorizeRole("company"),editCompany);
router.post("/update/status/:id",authenticateToken,authorizeRole("officer"),updateStatusCompany);




export default router;