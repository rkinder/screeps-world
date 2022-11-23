var roleHarvester = {
	
	run_harvester : function (creep) {

		creep.memory.job = 'harvest';

		if (creep.memory.filling && _.sum (creep.carry) >= creep.carryCapacity) {
			creep.memory.filling = false;
			delete creep.memory.source;
		}
		else if (!(creep.memory.filling) && creep.carry.energy <= 0) {
			creep.memory.filling = true;
			delete creep.memory.target;
		}
		if (creep.memory.filling) {
			if (creep.memory.source) {
				var source = Game.getObjectById (creep.memory.source);
			}
			else {
				var source = _.sample (creep.room.find (FIND_SOURCES));
				creep.memory.source = source.id;
			}
			if (creep.pos.isNearTo (source)) {
				var result = creep.harvest (source);
				if (result != OK) {
					console.log ('[{}] Unknown result from creep.harvest({}): {}'.format (creep.name, source, result));
				}
			}
			else {
				creep.moveTo (source);
			}
		}
		else {
			if (creep.memory.target) {
				var target = Game.getObjectById (creep.memory.target);
			}
			else {
				var target = _ (creep.room.find (FIND_STRUCTURES)).filter ((function __lambda__ (s) {
					return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity || s.structureType == STRUCTURE_CONTROLLER;
				})).sample ();
				creep.memory.target = target.id;
			}
			if (target.energyCapacity) {
				var is_close = creep.pos.isNearTo (target);
			}
			else {
				var is_close = creep.pos.inRangeTo (target, 3);
			}
			if (is_close) {
				if (target.energyCapacity) {
					var result = creep.transfer (target, RESOURCE_ENERGY);
					if (result == OK || result == ERR_FULL) {
						delete creep.memory.target;
					}
					else {
						console.log ('[{}] Unknown result from creep.transfer({}, {}): {}'.format (creep.name, target, RESOURCE_ENERGY, result));
					}
				}
				else {
					var result = creep.upgradeController (target);
					if (result != OK) {
						console.log ('[{}] Unknown result from creep.upgradeController({}): {}'.format (creep.name, target, result));
					}
					if (!(creep.pos.inRangeTo (target, 2))) {
						creep.moveTo (target);
					}
				}
			}
			else {
				creep.moveTo (target);
			}
		}
	}
};

module.exports = roleHarvester;