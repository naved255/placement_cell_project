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

import { fileURLToPath } from "url";
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




app.use("/",authenticationRouter);
app.use("/job",jobsRouter);
app.use("/application",applicationsRouter);
app.use("/student",studentRouter);
app.use("/company",companyRouter);
app.use("/officer",officerRouter);

app.get("/",(req,res)=>{
    res.send("Site is working");
})


app.use((err,req,res,next)=>{
  let {status = 500, message = "Something went wrong"} = err;
  res.status(httpStatus.BAD_REQUEST).json({message : new ExpressError(status,message)});
})

app.listen(port,()=>{
    console.log("server is runnig");
})