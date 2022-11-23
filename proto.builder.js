var roleBuilder = {

	run_builder : function (creep) {
		creep.memory.job = 'build';
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
				var target = _ (creep.room.find (FIND_MY_CONSTRUCTION_SITES)).filter ((function __lambda__ (s) {
					return (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION) && s.progress < s.progressTotal;
				})).sample ();
				
				if (target.id) {
				    creep.memory.target = target.id;
				} else {
				    var target = _ (creep.room.find (FIND_STRUCTURES)).filter ((function __lambda__ (s) {
					return (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION) && s.hits < s.hitsMax;
				    })).sample ();
				    creep.memory.target = target.id;
				}
			}
			var is_close = creep.pos.inRangeTo (target, 3);
			if (is_close) {
				var result = creep.build (target);
				if (result != OK) {
					// if we have a bad build, delete the target, try again
					console.log ('[{}] Unknown result from creep.build({}): {}'.format (creep.name, target, result));
					delete creep.memory.target;
				}
				if (!(creep.pos.inRangeTo (target, 2))) {
					creep.moveTo (target);
				}
			}
			else {
				creep.moveTo (target);
			}
		}
	}
};
module.exports = roleBuilder;