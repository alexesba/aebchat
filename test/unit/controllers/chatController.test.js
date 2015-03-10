require('sails-test-helper');
describe(TEST_NAME, function(){
  var request = require('request');

  before(function(done){
    User.destroy({}).exec(function(err){
      done();
    });
  });


  it('redirects to login if session doesn\'t exist', function(done){
    request({ method: 'GET', uri: 'http://localhost:9999/channel', followRedirect: false }, function(err, res, body){
      expect(res.statusCode).to.equal(302);
      expect(res.headers['location']).to.include('login');
      done();
    });
  });

  it('gets the channel if is authorized', function(done){
    userComplete = {
      name: 'First Name', email: 'admin@example.com',
      password: '123admin', passwordConfirmation: '123admin'
    };

    User.create(userComplete, function(err, user){
      expect(user.email).to.exist;
      request.defaults({ jar: true});
      request.post('http://localhost:9999/auth/login', {
        form: { email: user.email, password: user.password}
      },
      function(err, response, body){
        request.get('http://localhost:9999/channel', function(err, res, body){
          expect(res.statusCode).to.equal(200);
          done();
        });
      });

    });

  });

});
