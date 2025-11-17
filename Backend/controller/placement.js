import db from "../init/index.js"

export const uploadPlacement = async (req, res, next) => {
  try {
    const { application_id } = req.body;

    if (!application_id) {
      return res.status(400).json({
        message: "Application ID is required",
      });
    }

    const [data] = await db.execute(
      `SELECT  a.student_id, a.job_id, j.company_id,  j.salary_package  FROM applications a  JOIN jobs j ON j.job_id = a.job_id  JOIN companies c ON c.company_id = j.company_id  WHERE a.application_id = ?`,
      [application_id]
    );

    if (data.length === 0) {
      return res.status(404).json({
        message: "No record found for given application ID",
      });
    }

    const { student_id, company_id, job_id, salary_package } = data[0];
    const placement_date = new Date();


    const [existing] = await db.execute(
      `SELECT * FROM placements 
       WHERE student_id = ? AND job_id = ?`,
      [student_id, job_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "This student is already placed for this job",
      });
    }


    await db.execute(
      `INSERT INTO placements 
        (student_id, company_id, job_id, package_offered, placement_date)
       VALUES (?, ?, ?, ?, ?)`,
      [student_id, company_id, job_id, salary_package, placement_date]
    );


    await db.execute(
      `UPDATE applications SET status = 'Hired' WHERE application_id = ?`,
      [application_id]
    );

    return res.status(201).json({
      message: "Applicant hired successfully!",
    });

  } catch (error) {
    console.error("Error in uploadPlacement:", error);
    return res.status(500).json({
      message: "Server error while hiring applicant",
    });
  }
};


export const getPlacementStats = async (req, res) => {
  try {
    // 1️⃣ Fetch all placement data joined with students and companies
    const query = `
     SELECT 
  s.branch,
  u.name AS student_name,
  c.company_name,
  j.title AS job_title,
  p.package_offered,
  p.placement_date
FROM placements p
JOIN students s ON s.student_id = p.student_id
JOIN users u ON u.user_id = s.user_id
JOIN companies c ON c.company_id = p.company_id
JOIN jobs j ON j.job_id = p.job_id
ORDER BY s.branch, CAST(p.package_offered AS DECIMAL(10,2)) DESC;

    `;

    const [placements] = await db.execute(query);
    console.log(placements);
    // 2️⃣ Handle empty data
    if (!placements || placements.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No placement records found",
        placements: [],
        topStudents: [],
      });
    }

    // 3️⃣ Extract top 3 students
    const topStudents = placements.slice(0, 3).map((p) => ({
      name: p.student_name,
      branch: p.branch,
      company: p.company_name,
      package: `${p.package_offered} LPA`,
    }));

    console.log(topStudents);

    // 4️⃣ Send final response
    res.status(200).json({
      success: true,
      placements,   // full list
      topStudents,  // top 3
    });

  } catch (error) {
    console.error("❌ Error fetching placement stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch placement stats",
      error: error.message,
    });
  }
};


