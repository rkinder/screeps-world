
var spawner = {

    spawnCreep: function(spawn) {

    },
    evalNeed: function(spawn) {
        for (var name in Game.creeps) {
            // check current role
            // check time to live
            spawnRoom =spawn.room
            curLevel = Game.rooms[spawnRoom.name].controlLevel
            
            // if we need something, get the appropriate build
            switch(need) {
                case 'builder':
                    this.spawnBuilderType(spawn,curLevel);
                    break;
                case 'harvester':
                    this.spawnHarvesterType(spawn,curLevel);
                    break;
            };
        }
    },
    spawnBuilderType: function(spawn,controlLevel) {
        
        body = [CARRY,CARRY,WORK,MOVE,MOVE];
        if ((spawn.room.energyCapacityAvailable >= 350) && (spawn.room.energyCapacityAvailable <= 450)) {
            body.push(WORK);
        }
        spawn.spawnCreep(body, nextName, {Memory: {role: 'builder'}});
    },
    spawnHarvesterType: function(spawn,controlLevel) {
        body = [CARRY,WORK,WORK,MOVE];
        if ((spawn.room.energyCapacityAvailable >= 350) && (spawn.room.energyCapacityAvailable <= 450)) {
            body.push(MOVE);
        }
    }

}

module.exports = spawner;