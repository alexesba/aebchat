require('sails-test-helper');

describe(TEST_NAME, function(){
  describe('GET index', function(){
    it('should be succesfull', function(done){
      request.get('/chat').expect(200);
      done();
      });
  });

});
