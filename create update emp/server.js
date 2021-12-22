var path = require('path');
const express = require('express');
const cors = require('cors');
var app = express();
// const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
// const path = require("path");
// const app = express();


const mongoose=require('mongoose')
// var bodyParser = require('body-parser');
// require ("http://localhost:3000/style.css");

const { MongoClient } = require('mongodb');
const mongodb_url = "mongodb+srv://surya:mernstack@cluster0.w0son.mongodb.net/employees?retryWrites=true&w=majority";
mongoose.connect(mongodb_url,{useUnifiedTopology: true});
const db=mongoose.connection
db.on('error',()=>console.log("DB not connected"))
db.once('open',()=>console.log("Db connected"))

// //third party middlevar
// app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
// app.use('static', express.static('css'))
// app.use('/public/images/', express.static('./public/images'));
app.use(express.static(__dirname + '/public'));

const userapi=require('./router/employee.controller')

app.use('/ems',userapi)



app.listen(3000, function () {
    console.log("listening on 3000");
})  

// app.get('/', (req,res) => {
//     res.send('hey world');
// })
app.get('/', (req, res) => {
    res.render('index copy')
});


  app.post('/quotes', (req, res) => {
    console.log(req.body);
    res.end();
  })