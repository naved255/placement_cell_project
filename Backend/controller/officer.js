import db from "../init/index.js";


export const getOfficerProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const [officers] = await db.execute('select o.* , u.* from officer o join users u on o.user_id=u.user_id where o.user_id=?', [userId]);
    return res.status(200).json({
      officer: officers[0]
    })
  } catch (err) {
    console.log(err);
  }
}

export const updateProfile = async(req,res)=>{
  try{
    const {userId} = req.user;
    let { name , email , phone ,designation ,department , office_room_no } = req.body;
    
    await db.execute('update users set name=?, email=? where user_id=?',[name,email,userId]);
    await db.execute('update officer set phone=? , designation=? ,department=? , office_room_no=? where user_id=?',[phone, designation , department , office_room_no,userId] )
    return res.status(200).json({
      message : "user"
    })
  }catch(err){
    console.log(err);
  }
}

export const countData = async (req, res) => {

  try {
    
     let [totalStudent] = await db.execute('select count(student_id) as totalStudent from students');
     let [totalCompany] = await db.execute('select count(company_id) as totalCompany from companies');
     let [totalJobs] = await db.execute('select count(job_id) as totalJobs from jobs');
     let [totalPlacement] = await db.execute('select count(placement_id) as totalPlacement from placements');

     return res.status(200).json({
      totalStudent: totalStudent[0].totalStudent,
      totalCompany: totalCompany[0].totalCompany,
      totalJobs: totalJobs[0].totalJobs,
      totalPlacement: totalPlacement[0].totalPlacement,
      
     })
  } catch (error) {
    console.log(error);
  }
}

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting company with ID:", id);
    const [result] = await db.execute("DELETE FROM companies WHERE company_id = ?", [id]);
    console.log("DB Result:", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to remove company" });
  }
}

export const deleteStudent =  async (req, res) => {
  try {

    const { id } = req.params;

    const [result] = await db.execute("DELETE FROM students WHERE student_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "student not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to remove student" });
  }
}

export const getNotification = async (req, res) => {

  try {
    
    let [upcoming_drive] =  await db.execute(`select *from jobs where approval_status = 'approved' order by deadline asc limit 1`);
    let [unapproved_std] = await db.execute(`select count(student_id) as unApproved_std from students where approval_status = 'pending'`);
    let [unapproved_comp] = await db.execute(`select count(company_id) as unApproved_company from companies where approval_status = 'pending'`);
    let [unapproved_jobs] = await db.execute(`select count(job_id) as unApproved_job from jobs where approval_status = 'pending'`);

    console.log(upcoming_drive,  unapproved_jobs, unapproved_std, unapproved_comp);

    res.status(200).json({upcoming_drive, unapproved_jobs, unapproved_std, unapproved_comp});

  } catch (error) {
    console.log("error in getNotification: ",error);
  }
}
