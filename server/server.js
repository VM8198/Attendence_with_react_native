var exp = require('express');
var mongoose = require('mongoose');
var userController = require('./controllers/user.controller');

var bodyParser = require('body-parser');
var app = exp();
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.post('/user/adduser',userController.addUser);
app.post('/user/login',userController.login);


app.listen(4000);