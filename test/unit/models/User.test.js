require('sails-test-helper');

describe(TEST_NAME, function(){
  describe('.create()', function(){
    it('should not save the user without an email', function(done){
      User.create({
        name: 'johndo@example.com',
        password: '123tamarindo',
        passwordConfirmation: '123tamarindo' },
        function(err, user){
          expect(err.Errors.email).to.exist;
          done();
        });


    });
    it('should create a user', function(done){
      User.create({
        name: 'First Name',
        email: 'johndo@example.com',
        password: '123demo',
        passwordConfirmation: '123demo' },
        function(err, user){
          expect(user).to.have.property('name');
          expect(user.name).to.equal('First Name');
          expect(user.email).to.equal('johndo@example.com');
          done();
        });
    });
  });


});
