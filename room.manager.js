var _ = require('lodash');

var roomManager = {

  storeSources: function () {
    var roomSrcs = [];

     for(const spawn in Game.spawns) {
       var name = Game.spawns[spawn].room.name;
       var room = Game.rooms[name];

     if (room.memory['sources'] === undefined) {
        var sources = room.find(FIND_SOURCES);
        for (const src in sources) {
          roomSrcs.push(sources[src].id);
        }
        room.memory['sources'] = roomSrcs;
        console.log('added sources');
     } else {
        console.log("sources already mapped");
     }

    } 
  },
  manageController : function() {
    var controllers = [];

    for (const roomIndex in Game.rooms) {
      var room = Game.rooms[roomIndex];
      var controller = room.controller;

      if (controller.ticksToDowngrade == CONTROLLER_DOWNGRADE[controller.level] * .5) {
         console.log("Promoting a harvester to upgrader");
         var upgraders = _.filter(Game.creeps,{
           memory : { role : 'upgrader' }
         });

         if ((upgraders.length == 0)||(upgraders.length < controller.level)) {
            var tempUpgrader = room.find(FIND_MY_CREEPS,{
              filter: function(obj) { return obj.memory['role'] == 'harvester'; }
            });
            tempUpgrader.memory['role'] = 'upgrader';
         } else {
           console.log("No promotion needed: required upgrader(s) exists")
         }


      }
      controllers.push(controller);
    }
    
  } 
  
}

module.exports = roomManager;
