import mysql from 'mysql2/promise';

// Create the connection to database
  const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'placement_app',
  password : 'BeastCoder3136',
  })
export default db;



