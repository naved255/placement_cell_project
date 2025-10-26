import { v4 as uuidv4 } from 'uuid';
import db from "../init/index.js";
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please Enter all Credentials"
      })
    }
    let [users] = await db.execute('select * from users where email=? and role=?', [email, role]);
    if (users.length > 0) {
      return res.status(400).json({
        message: "User already registerd",
      })
    }

    let userId = uuidv4();
    let query = `INSERT INTO users (user_id, name , role , email , password) VALUES (?,?,?,?,?)`;
    let values = [userId, name, role, email, password];
    await db.execute(query, values);
    return res.status(201).json({ message: "User is registered" });
  }
  catch (err) {
    console.log(err);
  }
}

export const login = async (req, res, next) => {
  try {
    const JWT_SECRET = "mysecretPlacementApp";
    let { email, password } = req.body;

    let query = 'select * from users where  email = ? and password =?';
    let value = [email, password];
    const [users] = await db.execute(query, value);
    if (users.length == 0) {
      return res.status(404).json({ message: "User not exist" });
    }
    const user = users[0];
    const token = jwt.sign(
      {
        userId: user.user_id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    // 5. Store token in cookie
    res.cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
    return res.status(200).json({ token: token, role: user.role })
  } catch (err) {
    console.log(err);
  }
}

export const studentRegister = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    let { branch, department, rollno, yearOfStudy, cgpa, backlog } = req.body;
    let student_id = uuidv4();
    let query = 'INSERT INTO students (student_id, user_id , roll_number, branch , department, year_of_study, cgpa, backlog_status) VALUES (?,?,?,?,?,?,?,?,?)'
    const values = [student_id, user_id, rollno, branch, department, yearOfStudy, cgpa, backlog];
    await db.execute(query, values);
    res.status(httpStatus.CREATED).json({ message: "Student Registeration is Completed" });
  }
  catch (err) {
    throw err;
  }
}


export const companyRegister = async (req, res, next) => {
  try {
    const { userId } = req.user;
    let { CompanyName, description, contactNo, contactEmail, website } = req.body;
    if (!CompanyName || !description || !contactNo || !contactEmail || !website) {
      return res.status(400).json({ message: "Enter valid credientials" });
    }
    let comapnyId = uuidv4();
    let query = 'INSERT INTO companies (company_id,user_id,company_name,description,contact_no,contact_email,website) VALUES (?,?,?,?,?,?,?)';
    let values = [comapnyId, userId, CompanyName, description, contactNo, contactEmail, website];
    await db.execute(query, values);
    return res.status(201).json({ message: "CompanyRegisteraiton is Completed" });
  }
  catch (err) {
    console.log(err);
  }
}

export const checkProfile = async (req, res) => {
  const { userId } = req.user;
  const { role } = req.user;
  if (role == "student") {
    const [users] = await db.execute('select * from students where user_id=?', [userId]);
    if (users.length == 0) {
      return res.status(400).json({
        message: "User did not complete his registeration"
      })
    }
    return res.status(200).json({ message: "User has completed his profile" });
  }
  if (role == "company") {
    const [users] = await db.execute('select * from companies where user_id=?', [userId]);
    if (users.length == 0) {
      return res.status(400).json({
        message: "User did not complete his registeration"
      })
    }
    return res.status(200).json({ message: "User has completed his profile" });
  }
  if (role == "officer") {
    const [users] = await db.execute('select * from officer where user_id=?', [userId]);
    if (users.length == 0) {
      return res.status(400).json({
        message: "User did not complete his registeration"
      })
    }
    return res.status(200).json({ message: "User has completed his profile" });
  }
}

export const officerRegister = async (req, res) => {
  try {
    const { userId } = req.user;
    const { phone, designation, department, officeRoomNo } = req.body;
    let query = 'insert into officer (user_id,phone,designation,department, office_room_no) values (?,?,?,?,?)';
    let values = [userId, phone, designation, department, officeRoomNo];
    await db.execute(query, values);
    return res.status(201).json({
      message: "Officer Registeration completed"
    })
  }
  catch (err) {
    console.log(err);
  }
}