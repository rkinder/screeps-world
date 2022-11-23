var roomManager = {

  storeSources: function () {
    var roomSrcs = [];

     for(const spawn in Game.spawns) {
       var name = Game.spawns[spawn].room.name;
       var room = Game.rooms[name];

     if (room.memory['sources']) {
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
  } 
  
}

module.exports = roomManager;

