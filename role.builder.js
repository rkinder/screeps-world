var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creepName) {
        creep = Game.creeps[creepName];
        if(creep.store.energy < creep.store.getCapacity()) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleBuilder;
