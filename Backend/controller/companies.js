import httpStatus from 'http-status';
import db from "../init/index.js";
import { v4 as uuidv4 } from 'uuid';


export const getAllCompanies = async (req, res, next) => {
  const [companies] = await db.execute('select c.* , u.* from companies c join users u on c.user_id = u.user_id');
  res.status(httpStatus.OK).json({ companies: companies });
}

export const getCompanyById = async (req, res) => {
  const { userId } = req.user;
  const [companies] = await db.execute('select c.* , u.* from companies c join users u on c.user_id = u.user_id where u.user_id=?', [userId]);
  if (companies.length == 0) {
    return res.status(400).json({ message: "Company does not exist" });
  }
  return res.status(200).json({ company: companies[0] });
}

export const editCompany = async (req, res, next) => {
  const { userId } = req.user;
  let { company_name,
    contact_email,
    description,
    website,
    contact_no,
    approval_status,
    email
  } = req.body;

  console.log(req.body);
  let [companies] = await db.execute('select c.*, u.email, u.name from companies c join users u on c.user_id = u.user_id where c.user_id=?', [userId]);
  console.log(companies);
  company_name = company_name ? company_name : companies[0].company_name;
  description = description ? description : companies[0].description;
  contact_no = contact_no ? contact_no : companies[0].contact_no;
  contact_email = contact_email ? contact_email : companies[0].contact_email;
  website = website ? website : companies[0].website;
  email = email ? email : companies[0].email;

  const values = [company_name, description, website, contact_no, contact_email, userId];
  await db.execute('update users set  email=? where user_id = ?', [email, userId]);
  await db.execute('update companies set company_name=?,description=?, website=?, contact_no=?, contact_email=? where user_id = ?', values);
  res.status(httpStatus.OK).json({ message: "User updated" });
}

export const updateStatusCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Please Enter the status" });
    }
    await db.execute('update companies set approval_status=?  where company_id=?', [status, companyId]);
    return res.status(200).json({ message: "Status updated" });
  }
  catch (err) {
    console.log(err);
  }

}