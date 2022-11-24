var roomManager = require('room.manager');
var buildManager = require('build.manager');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var spawner = require('spawner');

module.exports.loop = function () {

    for(var spawn in Game.spawns) {
        if (!spawn.spawning) {
            spawner.evalNeed(spawn)
        }
    }

    roomManager.storeSources();
    roomManager.manageController();

    if ( Game.creeps ){
        for(var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];  
            if ((creep.memory['role'] == 'harvester') || 
                (creep.memory['role'] == 'Harvester')) 
            {
                roleHarvester.run(creepName);
            }
    
            if ((creep.memory['role'] == 'builder') || 
                (creep.memory['role'] == 'Builder')) 
            {
                roleBuilder.run(creepName);
            }
            if ((creep.memory['role'] == 'upgrader') || 
                (creep.memory['role'] == 'Upgrader')) 
            {
                roleUpgrader.run(creepName);
            }
        }
    }

}
