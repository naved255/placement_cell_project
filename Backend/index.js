import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import ejsMate from 'ejs-mate';


const port = 3000;
const app = express();
const __dirname = 'C:\\Users\\Dell\\Desktop\\web-developement\\apnaCollege\\DBMS_PLACEMENT_PROJECT';

// ejs
app.set('view engine', 'ejs');
app.set('ejs', path.join(__dirname, '/views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'navedahmad@1234',
    database: 'placement_cell_project'
})

app.get('/', (req, res, next) => {
    res.render('home');
})

//student route
app.get('/student', (req, res, next) => {

    let q = 'select *from students';

    connection.query(q, (err, result) => {

        if(err) console.log(err);
        
        res.render('./pages/student', {result});

    })
    
})

app.get('/company', (req, res, next) => {

    let q = 'select *from companies';

    connection.query(q, (err, companies) => {

        if(err) console.log(err);
        
        res.render('./pages/company', {companies});

    })
})

app.listen(port, (req, res) => {
    console.log(`the server is running on port: ${port}`);
})