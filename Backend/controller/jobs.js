import httpStatus from 'http-status';
import db from "../init/index.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllJobs = async (req, res, next) => {
  try {
    const [jobs] = await db.execute('SELECT j.*, c.company_name, c.description, c.website , c.contact_no ,c.contact_email  FROM jobs j JOIN companies c ON c.company_id=j.company_id');
    return res.status(httpStatus.OK).json({ jobs });
  }
  catch (err) {
    console.log(err);
  }
}

export const getJobByCompany = async (req, res) => {
  try {
    const {userId} = req.user;
    const [companies] = await db.execute("select * from companies where user_id=?",[userId]);
    if(companies.length == 0){
      return res.status(400).json({
      message : "Company does not exist or Company did not complete his registeration"
      })

    }
    const company = companies[0];
     const [jobs] = await db.execute('SELECT j.*, c.* FROM jobs j JOIN companies c ON c.company_id=j.company_id where j.company_id =?', [company.company_id]);

    return res.status(200).json({ jobs });
  }
  catch (err) {
    console.log(err);
  }
}

export const addNewJob = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const [companies] = await db.execute('select * from companies where user_id=?', [userId]);
    const { company_id } = companies[0];

    let jobId = uuidv4();
    let { jobTitle, description, minGpa, location, salary, yearOfStudy, deadline, allowedBranches } = req.body;
    const dateObj = new Date(deadline);
    const cgpa = parseFloat(minGpa);

    if (isNaN(dateObj)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ');

    let query = 'INSERT INTO jobs (job_id,company_id,title, description ,min_cgpa , allowed_branches , year_of_study, salary_package, deadline , location) VALUES (?,?,?,?,?,?,?,?,?,?)'

    let values = [jobId, company_id, jobTitle, description, cgpa, allowedBranches, yearOfStudy, salary, formattedDate, location];
    await db.execute(query, values);
    return res.status(201).json({ message: "New Job addes" });
  }
  catch (err) {
    console.log(err);
  }
}

export const updateStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Please Enter the status" });
    }
    await db.execute('update jobs set approval_status=?  where job_id =?', [status,jobId]);
    return res.status(200).json({ message: "Status updated" });
  }
  catch (err) {
    console.log(err);
  }
}