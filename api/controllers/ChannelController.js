/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res){
    Channel.find(function(err, channels) {
      res.json(channels);
    });
  },

  /**
   * `ChannelController.join()`
   */
  join: function (req, res, next) {
    // Grab the id of the channel to join
    var channelId = req.param('channelId');
    // Subscribe the socket to the channel
    Channel.subscribe(req, channelId, ['message']);
    //Continue processing the route
    req.user.channels.add(channelId);
    req.user.save(function(err, user){
      res.json({ User:  req.user.email + 'succesfully added to the chanel: ' + channelId });
    });
  },


  /**
   * `ChannelController.leave()`
   */
  leave: function (req, res, next) {
    // Grab the id of the channel to join
    var channelId = req.param('channelId');

    Channel.unsubscribe(req, channelId, ['message']);

    return next();

  }
};

