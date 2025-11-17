import jwt from 'jsonwebtoken';
import db from './init/index.js';

export const authenticateToken = (req, res, next) => {

  try {
    const token = req.cookies.token;
    if (!token) return res.status(404).json({ message: "No token found" });
    const JWT_SECRET = "mysecretPlacementApp";
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(404).json({ error: "Invalid or expired token" });
  }
}

export function authorizeRole(role) {

  return function (req, res, next) {

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    if (role != req.user.role) return res.status(403).json({ message: "You cannot accessed this" });
    return next(); // user has one of the allowed roles
  };
}

export const checkEligibility = async (req, res, next) => {


  const { job_id } = req.body;
  const { userId } = req.user;
  const [students] = await db.execute('select * from students where user_id=?', [userId]);

  if (students.length == 0) {
    return res.status(404).json({
      message: "User cannot apply until he completed his registeration"
    })
  }
  const student = students[0];


  const [jobs] = await db.execute('select * from jobs where job_id=?', [job_id]);
  const job = jobs[0];
  const deadlineDate = new Date(job.deadline);
  const today = new Date();
  if (today >= deadlineDate) {

    return res.status(400).json({
      message: "Application date is over"
    })
  }
  if (student.cgpa >= job.min_cgpa
    && student.year_of_study >= job.year_of_study
    && job.allowed_branches.toLowerCase().includes(student.branch.toLowerCase())
  ) {
    req.student = student.student_id;
    return next();
  }
  else {

    return res.status(400).json({
      message: "You are not eligible"
    })
  }

}

export const isApplied = async (req, res, next) => {
  const { job_id } = req.body;
  const { userId } = req.user;
  const [students] = await db.execute('select * from applications where job_id=? and student_id = (select student_id from students where user_id = ?)', [job_id, userId]);
  if (students.length > 0) {
    return res.status(400).json({
      message: "Your application already exist"
    })
  }

  next();

}