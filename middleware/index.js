var question= require('../models/question')
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'Please Sign in to proceed!');
        res.redirect('/login');
    },
    isAdmin: function(req, res, next) {
      if(req.user.isAdmin) {
        next();
      } else {
        req.flash('error', 'Psych you are not an admin');
        res.redirect('back');
      }
    },

  }