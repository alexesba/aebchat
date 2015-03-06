require('sails-test-helper');

describe(TEST_NAME, function(){
  describe('index()', function(){
    it('should be succesfull', function(done){
      request.get('/auth').expect(200);
      done();
    });
  });


  describe('google()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/google')
      .end(function(err, response){
        expect(response.status).to.equal(302);
        response.header['location'].should.include('google.com')
        done();
      });
    });
  });

  describe('github()', function(){
    it('should redirect to google.com/', function(done){
      request.get('/auth/github')
      .end(function(err, response){
        expect(response.status).to.equal(302);
        response.header['location'].should.include('github.com')
        done();
      });
    });
  });
});
