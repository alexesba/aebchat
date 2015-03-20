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

  describe('index()', function(){
    it('should redirect to login', function(done){
      request.get('/auth')
      .expect(302).end(function(err, res){
        expect(res.headers['location']).to.equal('/login');
        done();
      });
    });
  });


  describe('google()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/google')
      .expect(302)
      .end(function(err,res){
        res.header['location'].should.include('google.com')
        done();
      });
    });
  });

  describe('github()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/github')
      .expect(302)
      .end(function(err, res){
        res.headers['location'].should.include('github.com')
        done();
      });
    });
  });

  describe('register()', function(){
    it('creates a new account succesfully', function(done){
      var userComplete = {
        username: 'superadmin',
        email: 'superadmin@example.com',
        password: 'superadmin123'
      };
      request.post('/auth/local/register')
      .send(userComplete)
      .expect(200)
      .end(function(err, res){
        User.findOne({ email: userComplete.email}, function(err, user){
          user.destroy();
          done();
        });
      })
    });
  });


  describe('login()', function(){
    var currentUser = null;
    before(function(done){
      userComplete = {
        username: 'First Name', email: 'admin@example.com',
        password: '123admin'
      };
      done();
    });

    it('loged in successfuly', function(done){
      var _user, _passport;
      User.create(userComplete, function(err, user){
        _user = user;
        Passport.create({
          protocol: 'local',
          user: user.id,
          password: userComplete.password
        }, function(err, passport){
          _passport = passport;
          request.post('/auth/local')
          .send({
            identifier: userComplete.email,
            password: userComplete.password
          }).end(function(err, res){
            expect(res.status).to.equal(302);
            expect(res.header['location']).to.equal('/');
            _user.destroy();
            _passport.destroy();
            done();
          });
        });
      });
    });
  });

});

