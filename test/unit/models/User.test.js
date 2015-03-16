require('sails-test-helper');

describe(TEST_NAME, function(){

  var userComplete = {};

  beforeEach(function(done){
    userComplete = {
      username: 'First Name',
      email: 'johndo@example.com',
      password: '123demo'
    };
    User.destroy({}).exec(function(err){
      done();
    });
  });

  describe('.create()', function(){

    it('can\'t save the user without an email', function(done){
      delete(userComplete.email);
      User.create(userComplete, function(err, user){
        expect(err.Errors.email).to.exist;
        done();
      });
    });

    it('creates a user successfuly', function(done){
      User.create(userComplete, function(err, user){
        expect(user).to.have.property('username');
        expect(user.username).to.equal('First Name');
        expect(user.email).to.equal('johndo@example.com');
        user.destroy();
        done();
      });
    });

    it('has a channel collection', function(done){
      User.create(userComplete, function(err, user){
        expect(user).to.have.property('channels');
        user.destroy();
        done();
      });
    });
  });


});
