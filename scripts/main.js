var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var spawner = require('spawner');

module.exports.loop = function () {

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (spawn.spawning == false) {
            spawner.evalNeed(spawn)
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        /*
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } 
        */
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
    }
}