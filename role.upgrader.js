var roleUpgrader = {

    run: function(creep) {

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
                    console.log ('[%s] Unknown result from creep.harvest(%s): %s',creep.name, source, result);
                }
            }
            else {
                creep.moveTo (source);
            }
        } else {
			if (creep.memory.target) {
				var target = Game.getObjectById (creep.memory.target);
			}
			else {
				var target = _ (creep.room.find (FIND_STRUCTURES)).filter ((function __lambda__ (s) {
					return (s.structureType == STRUCTURE_CONTROLLER);
				})).sample ();
				creep.memory.target = target.id;
			}
			
			var is_close = creep.pos.inRangeTo (target, 3);

			if (is_close) {
				var result = creep.upgradeController (target);
				if (result != OK) {
					console.log ('[%s] Unknown result from creep.upgradeController(%s): %s',creep.name, target, result);
				}
				if (!(creep.pos.inRangeTo (target, 2))) {
					creep.moveTo (target);
				}
				
            } else {
				creep.moveTo (target);
			}
		}

    }

}

module.exports = roleUpgrader;