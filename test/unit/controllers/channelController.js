require('sails-test-helper');

describe(TEST_NAME, function(){
  var currentChannel, currentUser;
  beforeEach(function(done){
    Channel.create({
      name: 'Support'
    }, function(err, channel){
      currentChannel = channel;
    });
    User.create({
      name: 'First Name',
      email: 'alexesba@example.com',
      password: 'supersecret',
      passwordConfirmation: 'supersecret'
    }, function(err, user){
      currentUser = user;
    });
    done();

  });
  describe('.join()', function(){
    it('joins to a channel', function(done){
      done();
    });
  });

});
