import { stat } from "fs";
import db from "../init/index.js";
import httpStatus from 'http-status';
import {v4 as uuidv4} from 'uuid'

export const getAllApplications = async (req, res, next) => {
  let query = "select a.* , su.* , jc.* from applications a join (select s.* , u.name , u.email from students s join users u on s.user_id = u.user_id ) su on su.student_id = a.student_id join (select j.* , c.company_name from jobs j join companies c on j.company_id = c.company_id ) jc on jc.job_id = a.job_id ";
  const [applications] = await db.execute(query);
  res.status(httpStatus.OK).json({ applications });

}


export const newApplication = async (req, res, next) => {
  try {
    
    let {job_id} = req.body;
    let student_id = req.student;
    let application_id = uuidv4();

    let query = 'INSERT INTO applications (application_id, student_id,job_id) VALUES (?,?,?)';
    let values = [application_id, student_id, job_id];
    await db.execute(query, values);
    res.status(201).json({ message: "Application Added " });
    
  }
  catch (err) {
    console.log(err)
  }

}

export const updateStatus = async(req,res)=>{
  try{
  let {status, application_id} = req.body;
  if(!status){
    return res.status(400).json({
      message : "Invalid status"
    })
  }
  await db.execute('update applications set status=? where application_id=?',[status,application_id]);
  return res.status(200).json({
    message : "Status Updated"
  })
  }
  catch(err){
    console.log(err);
  }

}

export const getStudentApplication = async(req,res)=>{
  try{
    const {userId} = req.user;
    let query = "select a.* , su.* , jc.* from applications a join (select s.* , u.name , u.email from students s join users u on s.user_id = u.user_id ) su on su.student_id = a.student_id join (select j.* , c.company_name from jobs j join companies c on j.company_id = c.company_id ) jc on jc.job_id = a.job_id where su.user_id=?";
    const [applications] = await db.execute(query,[userId]);
    return res.status(200).json({
      applications
    })
  }catch(err){
    console.log(err);
  }
}

export const getJobApplications = async(req, res) => {
 try {
  let {jobId} = req.params;
  let [jobs] = await db.execute(`select *from applications a join students s on s.student_id = a.student_id  join users u on u.user_id = s.user_id  join jobs j on j.job_id = a.job_id where a.job_id = "${jobId}"`);
  console.log(jobs);
  return res.status(200).json({
    jobs
  })
 } catch (error) {
  res.status(400).json({
    message: "Something went wrong"
  })
 }
}