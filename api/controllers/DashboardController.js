var DashboardController = {
  index: function(req, res, next){
    User.findOne(req.user.id).populate('channels').exec(function(err, user){
      return res.view('homepage',{ userinfo: user });
    });
  }
};

module.exports = DashboardController;
