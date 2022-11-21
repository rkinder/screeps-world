
var spawner = {

    evalNeed: function(spawn) {
        spawnRoom =spawn.room
        curLevel = Game.rooms[spawnRoom.name].controlLevel

        for (var creep in Game.creeps) {
            // check time to live
            remainingLifeTime = ((creep.ticksToLive/1500)*100);
            switch(creep.Memory.role) {
                case 'builder':
                    builderCount = builderCount + 1;
                    totalCreeps = totalCreeps + 1;
                    break;
                case 'harvester':
                    harvesterCount = harvesterCount + 1;
                    totalCreeps = totalCreeps + 1;
                    break;
            };

            // Basic balancing act for deciding what to spawn
            if (harvesterCount == 0) {
                // spawn a harvester
                need = 'harvester'
            } else if ((builderCount == 0) && (harvesterCount > 0)) {
                // spawn a builder
                need = 'builder'
            } else {
                if (harvesterCount > builderCount) { need = 'builder' } 
                else { need = 'harvester' }
            }
              
        }        

        // if we need something, get the appropriate build
        switch(need) {
            case 'builder':
                this.spawnBuilderType(spawn,curLevel);
                break;
            case 'harvester':
                this.spawnHarvesterType(spawn,curLevel);
                break;
        };
    
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