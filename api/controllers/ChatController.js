/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  private: function(req, res){
    // Grab the id of th currently connected socket
    var websoketId  = sails.sockets.id(req.socket);
    User.findOne(req.session.users[websoketId].id).exec(function(err, sender){
      // Publish a message for the channel, only the users belongs to that channel
      // will be notified
      User.message(req, param('to'), { from: sender, msg: req.param('msg') });
    });
  },

  public: function(req, res){
    // Grab the id of th currently connected socket
    var websoketId = sails.sockets.id(req.socket);

    // Use the id to look up the user in the session
    User.findOne(req.session.users[websoketId].id).exec(function(err, user){
      //Publis the message for each user connected to the channel
      Channel.message(req.param('room'), {
        channel: { id: req.param('room')},
        from: user, msg: req.param('message')
      }, req.socket);
    });
  }
};

