require('sails-test-helper');
var supertest = require('supertest');
agent = supertest.agent;

describe(TEST_NAME, function(){

  var request;
  before(function(done){
    request = agent(sails.hooks.http.app);
    User.destroy({}).exec(function(err){
      done();
    });
  });


  it('restrict access if session doesn\'t exist', function(done){
    request.get('/channel').expect(403)
    .expect('You are not permitted to perform this action.', done);
  });



  it('gets the channel list if is authorized', function(done){
    var currentUser, currentPassport;
    var userComplete = {
      username: 'admin123',
      email: 'admin@example.com',
      password: '123admin'
    };
    User.create(userComplete, function(err, user){
      currentUser = user;
      var passport_attrs= {
        protocol: 'local',
        user: user.id,
        password: userComplete.password
      }
      Passport.create(passport_attrs, function(err, passport){
        currentPassport = passport;
        request.post('/auth/local').send({
          identifier: userComplete.username,
          password: userComplete.password
        }).end(function(err, res){
          request.get('/channel').expect(200).end(function(err, res){
            currentPassport.destroy();
            currentUser.destroy();
            done();
          });
        })
      });

    });



  });

});
