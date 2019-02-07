var userModel = require('../Models/user.model');
let userController = {};

userController.addUser = function(req,res){

entered_email = req.body.email;
console.log(req.body.email);
userModel.findOne({email: entered_email},function(err,foundEmail){
	if(foundEmail){
		res.status(402).send("Email already registered");
	}else{
		var user = new userModel(req.body);
		console.log("from server",req.body);
		user.save(function(err,savedUser){
			console.log("User saved",savedUser);
		res.send(savedUser)
	})
	
	}
})


console.log(req.body);
}

userController.login = function(req,res){
	entered_email = req.body.email;
	console.log("server entered email",req.body.email);
	entered_password = req.body.password;
	console.log("server entered email",req.body.password);
	userModel.findOne({email: entered_email},function(err,foundUser){

		if(foundUser){
			console.log("password",foundUser.password);
			if(foundUser.password == entered_password){
				res.status(200).send("Logged In success");
			}
			else{
				res.status(402).send("Unauthorizes Access")
				console.log("Wrong password");
			}
		}else{
			res.status(404).send("Email Not Found");
		}
	})	
}

module.exports = userController;
