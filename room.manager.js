var roomManager = {

    storeSources: function () {
      var spawns = Object.keys(Game.spawns); 
      var rooms = []

      for(var spawn in spawns) {
         rooms.push(Game.spawns[spawn].room.name); 
         name = Game.spawns[spawn].room.name;
         sources = Game.rooms[name] 
      } 
    } 
}

module.exports = roomManager;

