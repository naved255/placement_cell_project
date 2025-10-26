import httpStatus from 'http-status';
import db from "../init/index.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllStudent = async (req, res, next) => {
  let query = 'select s.* , u.* from students s join users u on s.user_id = u.user_id ';
  const [students] = await db.execute(query);
  res.status(httpStatus.OK).json({ students });
}

export const oneStudent = async (req, res, next) => {
  let studentId = req.params.id;
  let query = 'select s.*, u.* from students s join users u on s.user_id = u.user_id where s.student_id= ?';
  const [students] = await db.execute(query, [studentId]);
  res.status(httpStatus.OK).json({ student: students[0] });

}
export const editStudent = async (req, res, next) => {
  try {
    const { userId } = req.user;
      let query = 'select s.*, u.* from students s join users u on s.user_id = u.user_id where s.user_id=?';
  const [students] = await db.execute(query, [userId]);
    let { name, email, branch, department, rollno, yearOfStudy, cgpa, backlog } = req.body;
    name = name? name : students[0].name;
    email = email?email : students[0].email;
    branch = branch? branch : students[0].branch;
    department = department? department : students[0].department;
    rollno = rollno? rollno : students[0].roll_number;
    yearOfStudy = yearOfStudy? yearOfStudy : students[0].year_of_study;
    cgpa = cgpa? cgpa: students[0].cgpa;
    backlog = backlog? backlog : students[0].backlog_status


    const values = [branch, department, rollno, yearOfStudy, cgpa, backlog, userId];
    await db.execute('update users set name = ?, email=? where user_id = ?', [name, email, userId]);
    await db.execute('update students set branch=?, department=?, roll_number=?,year_of_study =?,cgpa=?,backlog_status=? where user_id = ?', values);
    res.status(httpStatus.OK).json({ message: "User updated" });
  }
  catch (err) {
    console.log(err);
  }
}

export const updateStatus = async(req,res)=>{
  const {status} = req.body;
  const studentId = req.params.id;
  if(!status){
    return res.status(400).json({message : "Please Enter the status"});
  }
  await db.execute('update students set approval_status=?  where student_id =?',[status,studentId]);
  return res.status(200).json({message : "Status updated"});
}

export const getProfile = async(req,res)=>{
  let {userId }= req.user;
  let query = 'select s.*, u.* from students s join users u on s.user_id = u.user_id where s.user_id= ?';
  const [students] = await db.execute(query, [userId]);
  if(students.length == 0){
    return res.status(400).json({
      message : "Cannot find student Profile",
    })
  }
  res.status(httpStatus.OK).json({ student: students[0] });

}