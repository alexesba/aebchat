require('sails-test-helper');
var request = require('supertest');
agent = request.agent;

describe(TEST_NAME, function(){

  var user;
  before(function(done){
    user = agent(sails.hooks.http.app);
    User.destroy({}).exec(function(err){
      done();
    });
  });


  it('restrict access if session doesn\'t exist', function(done){
    user.get('/channel').expect(403)
    .expect('You are not permitted to perform this action.', done);
  });



  it('gets the channel list if is authorized', function(done){
    userComplete = {
      username: 'admin123',
      email: 'admin@example.com',
      password: '123admin'
    };


    user.post('/auth/local/register')
    .send(userComplete)
    .end(function(err, res){
      user.get('/channel').expect(200, done);
    })
  });

});
