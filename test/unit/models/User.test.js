require('sails-test-helper');

describe(TEST_NAME, function(){

  var userComplete = {};

  beforeEach(function(done){
    userComplete = {
      name: 'First Name',
      email: 'johndo@example.com',
      password: '123demo',
      passwordConfirmation: '123demo'
    };
    done();
  });

  describe('.create()', function(){

    it('can\'t save the user without an email', function(done){
      delete(userComplete.email);
      User.create(userComplete, function(err, user){
        expect(err.Errors.email).to.exist;
        done();
      });
    });

    it('can\'t be created without confirm the password', function(done){
      delete(userComplete.passwordConfirmation);
      User.create(userComplete, function(err, user){
        expect(err.Errors.password).to.exist;
        expect(err.Errors.password[0].message).
          to.equal(User.validationMessages.password.password)
        done();
      });
    });

    it('creates a user successfuly', function(done){
      User.create(userComplete, function(err, user){
        expect(user).to.have.property('name');
        expect(user.name).to.equal('First Name');
        expect(user.email).to.equal('johndo@example.com');
        done();
      });
    });

    it('has a channel collection', function(done){
      User.create(userComplete, function(err, user){
        expect(user).to.have.property('channels');
        done();
      });
    });
  });


});
