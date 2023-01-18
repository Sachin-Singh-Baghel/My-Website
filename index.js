const express = require('express')
const app = express()
const path = require('path');
const con = require('./database.js')

const port = 8080

app.set("view engine", "ejs");
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));


app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/contact', (req, res) => {
  var data = req.body;
  console.log(data);
  console.log("You have been registered");
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO DB_Table (name, email , description) VALUES ?";
    var values = [
      [req.body.Name,req.body.Gmail,req.body.Des]
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  res.redirect("/")
})



app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})