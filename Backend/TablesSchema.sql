create database placement_cell_project;
use placement_cell_project;

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    cgpa DECIMAL(3,2) CHECK (cgpa >= 0 AND cgpa <= 10),
    department VARCHAR(30),
    dob DATE,
    address VARCHAR(500),
    gender VARCHAR(10),
    year_of_study INT CHECK (year_of_study BETWEEN 1 AND 4),
    resume_link VARCHAR(255),
    contact_no VARCHAR(10) CHECK (LENGTH(contact_no) = 10)
);

CREATE TABLE companies (
    company_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    industry_type VARCHAR(100),
    location VARCHAR(255),
    website VARCHAR(255),
    contact_person VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) CHECK (LENGTH(contact_no) BETWEEN 10 AND 15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE jobs (
    job_id VARCHAR(60) PRIMARY KEY,
    company_id VARCHAR(60) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    job_description TEXT,
    salary_package DECIMAL(6,2) NOT NULL,
    eligible_cgpa DECIMAL(3,2),
    allowed_branches TEXT,
    location VARCHAR(500),
    application_deadline DATE NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(60) NOT NULL,
    job_id VARCHAR(60) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE branches (
    branch_id INT NOT NULL AUTO_INCREMENT,
    branch_name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (branch_id)
);

CREATE TABLE job_branches (
    job_id VARCHAR(60) NOT NULL,
    branch_id INT NOT NULL,
    PRIMARY KEY (job_id, branch_id)
);

-- insertion code
INSERT INTO students (student_id, name, email, password, cgpa, department, dob, address, gender, year_of_study, resume_link, contact_no) VALUES
('S001', 'Alice Sharma', 'alice.sharma@example.com', 'pass123', 8.5, 'Computer Science', '2002-05-12', '123, MG Road, Delhi', 'Female', 3, 'resume_alice.pdf', '9876543210'),
('S002', 'Rohan Verma', 'rohan.verma@example.com', 'pass234', 7.8, 'Electrical', '2001-11-20', '45, Park Street, Kolkata', 'Male', 4, 'resume_rohan.pdf', '9123456780'),
('S003', 'Priya Singh', 'priya.singh@example.com', 'pass345', 9.1, 'Mechanical', '2003-01-15', '67, Ring Road, Jaipur', 'Female', 2, 'resume_priya.pdf', '9988776655'),
('S004', 'Amit Kumar', 'amit.kumar@example.com', 'pass456', 8.0, 'Civil', '2002-09-10', '89, Main Street, Lucknow', 'Male', 3, 'resume_amit.pdf', '9876512340'),
('S005', 'Sneha Joshi', 'sneha.joshi@example.com', 'pass567', 7.5, 'Computer Science', '2001-03-25', '12, Green Park, Delhi', 'Female', 4, 'resume_sneha.pdf', '9123498765'),
('S006', 'Vikram Patel', 'vikram.patel@example.com', 'pass678', 8.3, 'Electrical', '2002-06-30', '34, MG Road, Ahmedabad', 'Male', 3, 'resume_vikram.pdf', '9876541230'),
('S007', 'Anjali Mehra', 'anjali.mehra@example.com', 'pass789', 9.0, 'Mechanical', '2003-02-18', '56, Park Lane, Pune', 'Female', 2, 'resume_anjali.pdf', '9988771122'),
('S008', 'Karan Malhotra', 'karan.malhotra@example.com', 'pass890', 7.9, 'Civil', '2001-08-05', '78, Church Road, Chennai', 'Male', 4, 'resume_karan.pdf', '9123459876'),
('S009', 'Isha Gupta', 'isha.gupta@example.com', 'pass901', 8.7, 'Computer Science', '2002-12-22', '90, MG Road, Mumbai', 'Female', 3, 'resume_isha.pdf', '9876123450'),
('S010', 'Rajat Reddy', 'rajat.reddy@example.com', 'pass012', 7.6, 'Electrical', '2003-04-10', '23, Park Avenue, Hyderabad', 'Male', 2, 'resume_rajat.pdf', '9123789456');

INSERT INTO companies (company_id, name, email, password, industry_type, location, website, contact_person, contact_no) VALUES
('C001', 'TechSolutions', 'contact@techsolutions.com', 'comp123', 'IT Services', 'Bangalore', 'https://techsolutions.com', 'Rahul Sharma', '9876543211'),
('C002', 'BuildCorp', 'info@buildcorp.com', 'comp234', 'Construction', 'Mumbai', 'https://buildcorp.com', 'Anil Kumar', '9123456781'),
('C003', 'AutoMakers', 'hr@automakers.com', 'comp345', 'Automobile', 'Pune', 'https://automakers.com', 'Priya Reddy', '9988776656'),
('C004', 'GreenEnergy', 'careers@greenenergy.com', 'comp456', 'Energy', 'Delhi', 'https://greenenergy.com', 'Vikram Singh', '9876512341'),
('C005', 'FinTech Solutions', 'jobs@fintech.com', 'comp567', 'Finance', 'Hyderabad', 'https://fintech.com', 'Sneha Kapoor', '9123498766');

INSERT INTO branches (branch_name) VALUES
('Computer Science'),
('Electrical'),
('Mechanical'),
('Civil'),
('Electronics');

INSERT INTO jobs (job_id, company_id, job_title, job_description, salary_package, eligible_cgpa, location, application_deadline) VALUES
('J001', 'C001', 'Software Engineer', 'Develop and maintain software applications.', 7.5, 7.5, 'Bangalore', '2025-11-30'),
('J002', 'C002', 'Civil Engineer', 'Work on construction projects and site management.', 6.0, 7.0, 'Mumbai', '2025-12-15'),
('J003', 'C003', 'Mechanical Engineer', 'Design and maintain mechanical systems.', 6.5, 7.2, 'Pune', '2025-11-25'),
('J004', 'C004', 'Electrical Engineer', 'Work on energy systems and renewable projects.', 7.0, 7.5, 'Delhi', '2025-12-10'),
('J005', 'C005', 'Data Analyst', 'Analyze financial data and provide insights.', 8.0, 8.0, 'Hyderabad', '2025-11-28');

INSERT INTO jobs_branches (job_id, branch_id) VALUES
('J001', 1),  -- Computer Science
('J001', 5),  -- Electronics
('J002', 4),  -- Civil
('J003', 3),  -- Mechanical
('J004', 2),  -- Electrical
('J004', 5),  -- Electronics
('J005', 1),  -- Computer Science
('J005', 2);  -- Electrical

INSERT INTO applications (student_id, job_id, status) VALUES
('S001', 'J001', 'Pending'),
('S002', 'J004', 'Pending'),
('S003', 'J003', 'Pending'),
('S004', 'J002', 'Pending'),
('S005', 'J005', 'Pending'),
('S006', 'J004', 'Pending'),
('S007', 'J003', 'Pending'),
('S008', 'J002', 'Pending'),
('S009', 'J001', 'Pending'),
('S010', 'J005', 'Pending');