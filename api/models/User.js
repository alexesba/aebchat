/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['destroy', 'update'],

  attributes: {
    name: 'string',

    channels: {
      collection: 'channel',
      via: 'users',
      dominant: true
    }

  },

  afterPublishUpdate: function(id, changes, req, options){
    User.findOne(id).populate('channels').exec(function(err, user){
      // Publish a message to each room where the users belongs to
      // Saying from id:0 will indicate to the front-end it is a system message
      sails.util.each(user.channels, function(channel){
        var oldName = options.previous.name == 'unknown' ? 'User: #' + id : options.previous.name;
        Channel.message(room.id, { channel: { id: channel.id }, from: { id: 0 }, msg: oldName + "change their name to: " + changes.name }, req);
      });
    });
  }
};

