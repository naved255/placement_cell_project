import express from "express";
import db from "../init/index.js";
import { authenticateToken, authorizeRole } from "../middleware.js";
import { getCompanyNotifications, getStudentNotifications, postNotifications } from "../controller/notifications.js";


const router = express.Router();

router.post("/post",authenticateToken, authorizeRole("officer"), postNotifications );
router.get("/students", authenticateToken, authorizeRole("student"), getStudentNotifications);
router.get("/companies", authenticateToken, authorizeRole("company"), getCompanyNotifications);

export default router;