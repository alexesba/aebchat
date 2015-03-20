/**
* Channel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['destroy', 'update', 'add:users', 'remove:users'],
  attributes: {
    name:{
      type: 'string',
      required: true,
      minLength: 4
    },
    users: {
      collection: 'User',
      via: 'channels'
    }
  },
  validationMessages: {
    name:{
      required: 'The channel name is required',
      minLength: 'The channel name should be at least 4 characters length'
    }
  },

  afterPublishRemove: function(id, alias, idRemoved, req){
    //Get all the users in the channel
    Channel.findOne(id).populate('users').exec(function(err, channel){
      //Close the channel if is empty
      if(channel.users.length == 0){
        channel.destroy(function(err){
          Channel.publishDestroy(channel.id);
        });
      }
    });
  }

};

