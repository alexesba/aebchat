require('sails-test-helper');

describe('User model', function(){
  describe('.create()', function(){
    it('should not be successful', function(done){
      User.create().exec(function(err, record) {
        expect(err).to.exist;
        expect(record).to.not.exist;
        done();
      });
    });
  });
});
