require('sails-test-helper');

describe(TEST_NAME, function(){

  var channelComplete = {};

  beforeEach(function(done){
    channelComplete = {
      name: 'dex'
    };
    done();
  });

  describe('.create()', function(){

    it('can\'t be created without a valid name', function(done){
      Channel.create(channelComplete,function(err, channel){
        expect(err.Errors.name).to.exist;
        expect(err.Errors.name[0].message).
          to.equal(Channel.validationMessages.name.minLength);
        done();
      });
    });

    it('successfuly create a channel with a valid name', function(done){
      Channel.create({ name: 'Default'}, function(err, channel){
        expect(err).to.not.exist;
        expect(channel).to.have.property('name');
        expect(channel.name).to.equal('Default');
        done();
      });
    });

  });

});
