var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var spawner = require('spawner');

module.exports.loop = function () {

    for(var spawn in Game.spawns) {
        if (!spawn.spawning) {
            spawner.evalNeed(spawn)
        }
    }

    if ( Game.creeps ){
        for(var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];
            if ((creep.memory['role'] == 'harvester') || (creep.memory['role'] == 'Harvester')) {
                roleHarvester.run(creepName);
            }
    
            if ((creep.memory['role'] == 'builder') || (creep.memory['role'] == 'Builder')) {
                roleBuilder.run(creepName);
            }
            
        }
    }

}
