
var spawner = {

    spawnCreep: function(spawn) {

    },
    evalNeed: function(spawn) {
        for (var name in Game.creeps) {
            // check current role
            // check time to live

            // if we need something, get the appropriate build
            switch(need) {
                case 'builder':
                    body = this.getBuilderType(spawn)
            }
        }
    },
    getBuilderType: function(spawn) {
        
    }

}

module.exports = spawner;