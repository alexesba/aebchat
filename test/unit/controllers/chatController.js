require('sails-test-helper');

describe('chatController', function(){
  describe('GET index', function(){
    it('should be succesfull', function(){
      request.get('/chat').expect(200);
      });
  });
});
