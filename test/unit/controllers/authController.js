require('sails-test-helper');

describe(TEST_NAME, function(){
  describe('index()', function(){
    it('should be succesfull', function(done){
      request.get('/auth').expect(200);
      done();
    });
  });


  describe('google()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/google')
      .end(function(err, response){
        expect(response.status).to.equal(302);
        response.header['location'].should.include('google.com')
        done();
      });
    });
  });

  describe('github()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/github')
      .end(function(err, response){
        expect(response.status).to.equal(302);
        response.header['location'].should.include('github.com')
        done();
      });
    });
  });


  describe('login()', function(){

    before(function(done){
      currenUser  = {};
      userComplete = {
        name: 'First Name',
        email: 'admin@example.com',
        password: '123admin',
        passwordConfirmation: '123admin'
      };
      User.create(userComplete, function(err, user){
        currenUser = user;
        done();
      });
    });

    it('it can get the channel list if is authorized', function(done){
      var request = require('request')

      var cookie = null;
        request({
          uri: 'http://localhost:9999/auth/login',
          form: { email: userComplete.email, password: userComplete.password}
        }, function(err, response, body){
          var myCookie = request.cookie(response.headers['set-cookie'][0]);
          var cookieJar = request.jar();
          cookieJar.setCookie(myCookie, '/');

          request({
            method: 'GET',
            uri: 'http://localhost:9999/channel',
            jar: cookieJar
          }, function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
          });

      });


    });
  });

});

