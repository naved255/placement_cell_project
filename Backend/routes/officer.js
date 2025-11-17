import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware.js';
import { getOfficerProfile, updateProfile, countData, getNotification, deleteCompany, deleteStudent } from '../controller/officer.js';
const router = express.Router();
import db from '../init/index.js';


router.get("/profile",authenticateToken,authorizeRole("officer"),getOfficerProfile);
router.post("/update",authenticateToken,authorizeRole("officer"),updateProfile);
router.get("/countData",authenticateToken,authorizeRole("officer"), countData);
router.delete("/delete/company/:id", authenticateToken, authorizeRole("officer"), deleteCompany);
router.delete("/delete/student/:id", authenticateToken, authorizeRole("officer"), deleteStudent);

router.delete("/delete/job/:id", authenticateToken, authorizeRole("officer"), async (req, res) => {
  try {
    const { id } = req.params;
    const [result1] = await db.execute("DELETE FROM applications where job_id = ?", [id]);
    const [result] = await db.execute("DELETE FROM jobs WHERE job_id = ?", [id]);

    if (result.affectedRows === 0 || result1.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ send a success response
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to remove job" });
  }
});

router.get("/notification", authenticateToken, getNotification);




export default router;