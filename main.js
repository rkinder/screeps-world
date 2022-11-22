var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var spawner = require('spawner');

module.exports.loop = function () {

    for(var spawn in Game.spawns) {
        if (!spawn.spawning) {
            spawner.evalNeed(spawn)
        }
    }

    if ( Game.creeps.length > 0 ){
        for(var creep in Game.creeps) {
        
            if ((creep.memory['role'] == 'harvester') || (creep.memory['role'] == 'Harvester')) {
                roleHarvester.run(creep);
            }
    
            if ((creep.memory['role'] == 'builder') || (creep.memory['role'] == 'Builder')) {
                roleBuilder.run(creep);
            }
            
        }
    }

}