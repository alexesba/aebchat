  /**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');

module.exports = {

  session: function(req, res){
    if(req.session.passport.user){
      res.json(req.user);
    }else{
      res.json({});
    }
  },

  /**
   * AuthController.index()
   *
   */
  index: function(req, res){
    res.view();
  },

  /**
   * AuthController.logout()
   *
   */
  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },

  login: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user))
        {
          res.redirect('/login');
          return;
        }

        req.logIn(user, function(err) {
          if (err)
            {
              res.view();
              return;
            }

            res.redirect('/');
            return;
        });
    })(req, res);
  },


  /**
   * `AuthController.github()`
   */
  github: function (req, res) {
    passport.authenticate('github', { failureRedirect: '/#/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          res.view('500');
          return;
        }

        res.redirect('/#/login');
        return;
      });
    })(req, res);
  },


  /**
   * `AuthController.google()`
   */
  google: function (req, res) {
    passport.authenticate('google', { failureRedirect: '/#/login', scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'}, function(err, user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log(err);
            return res.view('500');
          }
          return res.redirect('/#/login');
        });
        })(req, res);
  }
};

