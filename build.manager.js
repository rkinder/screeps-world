var _ = require('lodash');

var buildManager = {

    storeConstructionSites: function () {
      var spawns = Object.keys(Game.spawns); 
      var sites = [];
      var siteArray = [];

      for(var spawn in spawns) {
         room = Game.spawns[spawn].room;
         // sort sites by progress, progressTotal 
         sites = _.sortBy(room.find(FIND_MY_CONSTUCTION_SITES), 
           [ function(o) { return o.progress}]); 
         for (var site in sites) {
           siteArray.push(site.id);
         }
         room.memory['conSites'] = siteArray;
      } 
    } 
};

module.exports = roomManager;

