require('sails-test-helper');
var supertest = require('supertest');
agent = supertest.agent;

describe(TEST_NAME,  function(){
  var currentChannel, currentUser, currentPassport;
  var userAttributes = {
    username: 'alexesba',
    email: 'alexesba@example.com',
    password: 'supersecret'
  }
  before(function(done){
    // request = agent(sails.hooks.http.app);
    request = agent(sails.hooks.sockets);
    Channel.create({ name: 'Support' }, function(err, channel){
      currentChannel = channel;

      User.create(userAttributes, function(err, user){
        currentUser = user;
        Passport.create({
          protocol: 'local',
          user: user.id,
          password: userAttributes.password
        }, function(err, passport){
          currentPassport = passport;
          //login the user and keep the session
          request.post('/auth/local')
          .send({ identifier: currentUser.email,
                password: userAttributes.password
          }).end(function(err, res){
            done();
          });

        });

      });

    });

  });

  describe('.join()', function(){
    it('joins to a channel', function(done){

      request.post('/channel/' + currentChannel.id + '/users')
      .send({ channelId: currentChannel.id })
      .expect(200).end(function(err, res){
        console.log(res);
        done();
      });

      // currentChannel.destroy(function(err){
      //   currentUser.destroy(function(err){
      //     done();
      //   });
      // });


    });
  });

});
