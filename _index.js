const express = require ('express');
const querystring = require('querystring');
const cors = require('cors');
const mysql2 = require ('mysql2/promise');
const pool = mysql2.createPool ({
    host: 'localhost',
    user: 'root',
    database: 'expo',
    password: 'password',
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
    pool.query('SELECT * FROM tab1').then(function(data) {
        res.json(data);
    });
});
app.post('/add', async function (req, res) {
    console.log(req.body);
    
    const {nam, ag} = req.body;
    await pool.query('INSERT INTO tab1 SET ?',{
        name:nam,
        age:Number(ag)
    });

    if(req.header('t')==='b') {
        res.json({ success: true });
    } else {
        res.redirect('http://truruki.ru/');
    }

    
   //
   console.log("мой заголовок"+req.header('t'));


});
app.listen(30333, ()=> {
    console.log("It's started", new Date());
});
