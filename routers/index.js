var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");




//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
        });
    });
});



router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/questions",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to the quiz!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
});


module.exports = router;