import express from "express";
import path from "path";
import ExpressError from "./utilis/ExpressError.js";
import httpStatus from 'http-status';
import cors from 'cors';
import cookieParser  from "cookie-parser";
// importing router 
import jobsRouter from "./routes/jobs.js";
import applicationsRouter from "./routes/applications.js" ;
import authenticationRouter from "./routes/authentication.js";
import studentRouter from "./routes/students.js";
import companyRouter from "./routes/companies.js";
import officerRouter from './routes/officer.js';
import { authenticateToken, authorizeRole } from "./middleware.js";
import { fileURLToPath } from "url";
import placementRoute from "./routes/placement.js"
import notificationRoute from "./routes/notifications.js";
import db from "./init/index.js";
import {v4 as uuidv4} from 'uuid'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 8000;
// Create the connection to database

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}
));



app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"/public")));



app.get("/check-auth", authenticateToken, (req, res) => {
  res.json({ userId: req.user.userId, role: req.user.role });
});

app.post("/test", (req, res) => {
  console.log("Test hit:", req.body);
  res.send("WORKING");
});

app.use("/",authenticationRouter);
app.use("/job",jobsRouter);
app.use("/application",applicationsRouter);
app.use("/student",studentRouter);
app.use("/company",companyRouter);
app.use("/officer",officerRouter);
app.use("/placement", placementRoute);
app.use("/notification", notificationRoute);


app.get("/",(req,res)=>{
    res.send("Site is working");
})


app.use((err,req,res,next)=>{
  let {status = 500, message = "Something went wrong"} = err;
  res.status(status).json({message : new ExpressError(status,message)});
})

app.listen(port,()=>{
    console.log("server is runnig");
})