import mysql from 'mysql2/promise';

// Create the connection to database
  const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'placement_cell_project',
  password : 'navedahmad@1234',
  })
export default db;



