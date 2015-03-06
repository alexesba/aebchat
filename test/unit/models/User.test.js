require('sails-test-helper');

describe(TEST_NAME, function(){
//define the factory
  before(function(done) {
    factory.define('User')
    .attr('name', 'First Name')
    .attr('provider', 'google')
    .attr('email', 'johndo@example.com')
    .attr('password', 'demo123');
  done();
  });

  describe('.create()', function(){
    it('should throw an error when the email is not present', function(done){
      factory.build('User', { name: 'Jonh Doe', email: null , password: 'demo123'}, function(user){
        expect(user).to.not.exists;
        done();
      });
    });
    it('should create a user', function(done){
      factory.create('User', function(user){
          expect(user).to.have.property('name');
          expect(user.name).to.equal('First Name');
          expect(user.email).to.equal('johndo@example.com');
          done();
      });
    });
  });


});
