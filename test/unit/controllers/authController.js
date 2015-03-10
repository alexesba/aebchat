require('sails-test-helper');

describe(TEST_NAME, function(){
  var request = require('request')
  //remember cookies for future use
  request.defaults({ jar: true });

  before(function(done){
    User.destroy({}).exec(function(err){
      done();
    });
  });

  describe('index()', function(){
    it('should be succesfull', function(done){
      request.get({ uri: 'http://localhost:9999/auth', followRedirect: false }, function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });


  describe('google()', function(){
    it('should redirect to google.com/', function(done){
      request.get({ uri: 'http://localhost:9999/auth/google', followRedirect: false }, function(err, res, body){
        expect(res.statusCode).to.equal(302);
        res.headers['location'].should.include('google.com')
        done();
      });
    });
  });

  describe('github()', function(){
    it('should redirect to google.com/', function(done){
      request.get({ uri: 'http://localhost:9999/auth/github', followRedirect: false }, function(err, res, body){
        expect(res.statusCode).to.equal(302);
        res.headers['location'].should.include('github.com')
        done();
      });
    });
  });


  describe('login()', function(){
    var currentUser = null;
    before(function(done){
      userComplete = {
        name: 'First Name', email: 'admin@example.com',
        password: '123admin', passwordConfirmation: '123admin'
      };
      done();
    });

    it('loged in successfuly', function(done){
      User.create(userComplete, function(err, user){
        request.post('http://localhost:9999/auth/login', {
          form: { email: user.email, password: user.password}
        },
        function(err, response, body){
          expect(response.headers['set-cookie'][0]).to.exists
          user.destroy();
          done();
        });
      });
    });
  });

});

