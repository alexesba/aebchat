/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['destroy', 'update'],

  attributes: {
    name: {
      type: 'string',
      required: true,
      },
    provider: 'string',
    uid: 'string',
    email: { type: 'string', required: true },
    firstname: 'string',
    lastname: 'string',
    password: 'string',
    channels: {
      collection: 'channel',
      via: 'users',
      dominant: true
    }

  },

  validationMessages: { //hand for i18n & l10n
    email: {
      required: 'Email is required',
      email: 'Provide valid email address',
      unique: 'Email address is already taken'
    },
    name: {
      required: 'Username is required'
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
  },
  beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });
  }
};

