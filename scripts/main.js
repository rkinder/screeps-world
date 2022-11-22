var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var spawner = require('spawner');

module.exports.loop = function () {

    for(var spawn in Game.spawns) {
        if (!spawn.spawning) {
            spawner.evalNeed(spawn)
        }
    }

    for(var creep in Game.creeps) {
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
    }
}