create database placement_cell_project;
use placement_cell_project;

CREATE TABLE users (
  user_id varchar(250) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'company', 'officer') DEFAULT 'student'
);

CREATE TABLE students (
  student_id varchar(250) PRIMARY KEY,
  user_id varchar(250) ,
  roll_number VARCHAR(50) UNIQUE,
  branch ENUM("Computer Engineering", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics Engineering"),
  year_of_study VARCHAR(20),
  department varchar(75),
  cgpa DECIMAL(3,2),
  resume_url TEXT,
  backlog_status ENUM('none', 'active') DEFAULT 'none',
  approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE companies (
  company_id varchar(250) PRIMARY KEY,
  user_id varchar(250) ,
  company_name VARCHAR(100),
  description TEXT,
  website TEXT,
  contact_no VARCHAR(10),
  contact_email VARCHAR(100),
  approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);



CREATE TABLE jobs (
  job_id varchar(250) PRIMARY KEY,
  company_id varchar(250),
  title VARCHAR(100),
  description TEXT,
  min_cgpa DECIMAL(3,2),
  allowed_branches VARCHAR(255), 
  year_of_study VARCHAR(20),
  salary_package VARCHAR(50),
  location VARCHAR(100),
  deadline DATE,
  approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE applications (
  application_id varchar(250) primary key,
  student_id varchar(250),
  job_id varchar(250),
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Applied', 'Shortlisted', 'Rejected', 'Hired') DEFAULT 'Applied',
  eligibility_status ENUM('eligible', 'not_eligible') DEFAULT 'eligible',
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
);

CREATE TABLE placements (
  placement_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id varchar(250),
  company_id varchar(250),
  job_id varchar(250),
  package_offered VARCHAR(50),
  placement_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
);


CREATE TABLE officer (
    user_id varchar(250) primary key,
    phone VARCHAR(15),
    designation VARCHAR(50) DEFAULT 'Placement Officer',
    department VARCHAR(100) DEFAULT 'Training and Placement Cell',
    office_room_no VARCHAR(20),
    profile_photo VARCHAR(255) DEFAULT 'default_officer.jpg',
    joining_date DATE,
    last_login TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE notifications (
  notification_id VARCHAR(250) PRIMARY KEY,
  officer_id VARCHAR(250),
  receiver ENUM('students', 'companies', 'both') NOT NULL,
  title VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE,

  FOREIGN KEY (officer_id) REFERENCES officer(user_id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);



-- 1️⃣ Insert 25 users as students
INSERT INTO users (user_id, name, email, password, role) VALUES
(UUID(), 'Aman Sharma', 'aman.sharma@example.com', 'pass123', 'student'),
(UUID(), 'Priya Mehta', 'priya.mehta@example.com', 'pass123', 'student'),
(UUID(), 'Ravi Patel', 'ravi.patel@example.com', 'pass123', 'student'),
(UUID(), 'Neha Singh', 'neha.singh@example.com', 'pass123', 'student'),
(UUID(), 'Karan Verma', 'karan.verma@example.com', 'pass123', 'student'),
(UUID(), 'Saurabh Kumar', 'saurabh.kumar@example.com', 'pass123', 'student'),
(UUID(), 'Anjali Gupta', 'anjali.gupta@example.com', 'pass123', 'student'),
(UUID(), 'Mohit Reddy', 'mohit.reddy@example.com', 'pass123', 'student'),
(UUID(), 'Kritika Singh', 'kritika.singh@example.com', 'pass123', 'student'),
(UUID(), 'Arjun Das', 'arjun.das@example.com', 'pass123', 'student'),
(UUID(), 'Deepa Nair', 'deepa.nair@example.com', 'pass123', 'student'),
(UUID(), 'Rahul Yadav', 'rahul.yadav@example.com', 'pass123', 'student'),
(UUID(), 'Tanya Joshi', 'tanya.joshi@example.com', 'pass123', 'student'),
(UUID(), 'Nikhil Bhatia', 'nikhil.bhatia@example.com', 'pass123', 'student'),
(UUID(), 'Sneha Iyer', 'sneha.iyer@example.com', 'pass123', 'student'),
(UUID(), 'Vikas Chauhan', 'vikas.chauhan@example.com', 'pass123', 'student'),
(UUID(), 'Pooja Rani', 'pooja.rani@example.com', 'pass123', 'student'),
(UUID(), 'Rohit Verma', 'rohit.verma@example.com', 'pass123', 'student'),
(UUID(), 'Manish Tiwari', 'manish.tiwari@example.com', 'pass123', 'student'),
(UUID(), 'Megha Kapoor', 'megha.kapoor@example.com', 'pass123', 'student'),
(UUID(), 'Abhishek Rao', 'abhishek.rao@example.com', 'pass123', 'student'),
(UUID(), 'Simran Kaur', 'simran.kaur@example.com', 'pass123', 'student'),
(UUID(), 'Sanjay Pillai', 'sanjay.pillai@example.com', 'pass123', 'student'),
(UUID(), 'Divya Nair', 'divya.nair@example.com', 'pass123', 'student'),
(UUID(), 'Ankit Jain', 'ankit.jain@example.com', 'pass123', 'student');

-- 2️⃣ Insert students (linking to user table)
INSERT INTO students (student_id, user_id, roll_number, branch, year_of_study, department, cgpa, resume_url, backlog_status, approval_status)
SELECT 
UUID(), user_id, 
CONCAT('CE', LPAD(ROW_NUMBER() OVER (), 3, '0')),
ELT(FLOOR(1 + (RAND() * 5)), 'Computer Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics Engineering'),
ELT(FLOOR(1 + (RAND() * 4)), 'First', 'Second', 'Third', 'Final'),
ELT(FLOOR(1 + (RAND() * 5)), 'CSE', 'CIV', 'ME', 'EEE', 'ECE'),
ROUND(6.5 + (RAND() * 3), 2),
'https://example.com/resume.pdf',
'none',
'approved'
FROM users WHERE role = 'student';
');

-- 1️⃣ Insert company users
INSERT INTO users (user_id, name, email, password, role) VALUES
(UUID(), 'Google India', 'hr@google.com', 'pass123', 'company'),
(UUID(), 'Amazon Development Centre', 'hr@amazon.com', 'pass123', 'company'),
(UUID(), 'Microsoft India', 'hr@microsoft.com', 'pass123', 'company'),
(UUID(), 'TCS Digital', 'hr@tcs.com', 'pass123', 'company'),
(UUID(), 'Infosys Ltd', 'hr@infosys.com', 'pass123', 'company'),
(UUID(), 'Wipro Technologies', 'hr@wipro.com', 'pass123', 'company'),
(UUID(), 'Tech Mahindra', 'hr@techm.com', 'pass123', 'company'),
(UUID(), 'Accenture India', 'hr@accenture.com', 'pass123', 'company');

-- 2️⃣ Insert companies
INSERT INTO companies (company_id, user_id, company_name, description, website, contact_no, contact_email, approval_status)
SELECT 
UUID(),
user_id,
name,
CONCAT('Leading IT and Consulting firm: ', name),
CONCAT('https://', LOWER(REPLACE(SUBSTRING_INDEX(name, ' ', 1), '.', '')), '.com'),
'9876543210',
email,
'approved'
FROM users WHERE role = 'company';


INSERT INTO jobs (job_id, company_id, title, description, min_cgpa, allowed_branches, year_of_study, salary_package, location, deadline, approval_status)
SELECT 
UUID(),
company_id,
CONCAT('Software Engineer - ', company_name),
'Exciting role for freshers',
ROUND(6.5 + RAND()*2, 2),
'Computer Engineering, Electronics Engineering, Electrical Engineering',
'Final',
CONCAT(ROUND(5 + RAND()*20, 2), ' LPA'),
'Bangalore',
DATE_ADD(CURDATE(), INTERVAL 30 DAY),
'approved'
FROM companies;


INSERT INTO placements (student_id, company_id, job_id, package_offered, placement_date)
SELECT 
s.student_id,
j.company_id,
j.job_id,
CONCAT(ROUND(5 + RAND()*20, 2), ' LPA'),
DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND()*180) DAY)
FROM students s
JOIN jobs j ON RAND() < 0.3
LIMIT 20;








