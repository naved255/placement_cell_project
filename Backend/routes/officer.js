import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware.js';
import { getOfficerProfile, updateProfile } from '../controller/officer.js';
const router = express.Router();


router.get("/profile",authenticateToken,authorizeRole("officer"),getOfficerProfile);
router.post("/update",authenticateToken,authorizeRole("officer"),updateProfile);


export default router;