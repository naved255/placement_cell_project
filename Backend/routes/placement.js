import express from "express";
import {getPlacementStats, uploadPlacement} from "../controller/placement.js";

const router = express.Router();


router.post("/new",uploadPlacement);
router.get("/placement-stats",getPlacementStats );


export default router;