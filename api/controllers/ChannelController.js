/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `ChannelController.join()`
   */
  join: function (req, res) {
    // Grab the id of the channel to join
    var channelId = req.param('channelId');
    // Subscribe the socket to the channel
    Channel.subscribe(req, channelId, ['message']);
    //Continue processing the route
    return next();
  },


  /**
   * `ChannelController.leave()`
   */
  leave: function (req, res) {
    // Grab the id of the channel to join
    var channelId = req.param('channelId');

    Channel.unsubscribe(req, channelId, ['message']);

    return next();

  }
};

