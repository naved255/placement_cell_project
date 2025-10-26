import express from "express";
const router = express.Router();
import { authenticateToken, authorizeRole } from "../middleware.js";

import { editStudent, getAllStudent, getProfile, oneStudent, updateStatus } from "../controller/students.js";


router.get("/get",getAllStudent);
router.get("/get/:id",authenticateToken,oneStudent);
router.get("/profile",authenticateToken,authorizeRole("student"),getProfile);
router.post("/update",authenticateToken,authorizeRole("student"),editStudent);
router.post("/update/status/:id",authenticateToken,authorizeRole("officer"),updateStatus);

export default router;