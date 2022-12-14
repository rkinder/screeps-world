var spawner = {

    evalNeed: function(spawn) {
        var spawnRoom = Game.spawns[spawn].room;
        var spawnObj = Game.spawns[spawn];
        var need = 'None';
        var harvesterCount = 0;
        var builderCount = 0;
        var remainingLifeTime = 0;
        var totalCreeps = 0;


        // console.log("starting evalNeed");
        if ( Object.keys(Game.creeps).length > 0) {
            for (var creep in Game.creeps) {
                // check time to live
                remainingLifeTime = ((Game.creeps[creep].ticksToLive/1500)*100);
                // console.log("ttl set:" + creep);
                if (Game.creeps[creep].memory['role'] !== undefined) {
            
                    switch(Game.creeps[creep].memory['role']) {
                        case 'builder':
                            builderCount = builderCount + 1;
                            totalCreeps = totalCreeps + 1;
                            break;
                        case 'harvester':
                            harvesterCount = harvesterCount + 1;
                            totalCreeps = totalCreeps + 1;
                            break;
                    }
                    
                } else {
                    // console.log("Creep: " + creep + " - ELSE");
                    Game.creeps[creep].memory['role'] = 'harvester';
                }
            }
        }

        // console.log("After for loop");
        
        // Basic balancing act for deciding what to spawn
        if (harvesterCount == 0) {
            // spawn a harvester
            need = 'harvester'
        } else if ((builderCount == 0) && (harvesterCount > 0)) {
            // spawn a builder
            need = 'builder'
        } else {
            if (harvesterCount > builderCount) { need = 'builder' } 
            else { need = 'harvester' }
        }
                  

        // if we need something, get the appropriate build
        switch(need) {
            case 'builder':
                this.spawnBuilderType(spawn);
                break;
            case 'harvester':
                this.spawnHarvesterType(spawn);
                break;
        }
        // console.log("Leaving spawner.evalNeed()");
    
    },
    spawnBuilderType: function(spawn) {
        var spawnObj = Game.spawns[spawn];
        var body = [CARRY,CARRY,WORK,MOVE,MOVE];

        if ((spawnObj.room.energyCapacityAvailable >= 350) && (spawnObj.room.energyCapacityAvailable <= 450)) {
            body.push(WORK);
        }
        spawnObj.spawnCreep(body, this.nextName(), {memory: {role: 'builder'}});
    },
    spawnHarvesterType: function(spawn) {
        var spawnObj = Game.spawns[spawn];
        var body = [CARRY,WORK,WORK,MOVE];

        if ((spawnObj.room.energyCapacityAvailable >= 350) && (spawnObj.room.energyCapacityAvailable <= 450)) {
            body.push(MOVE);
        }

        spawnObj.spawnCreep(body, this.nextName(), {memory: {role: 'harvester'}});
    },
    nextName: function() {
        
        var names1 = ["Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Jayden", "Ethan", "Jacob", "Jack", "Caden", "Logan", "Benjamin", "Michael", "Caleb", "Ryan", "Alexander", "Elijah", "James", "William", "Oliver", "Connor", "Matthew", "Daniel", "Luke", "Brayden", "Jayce", "Henry", "Carter", "Dylan", "Gabriel", "Joshua", "Nicholas", "Isaac", "Owen", "Nathan", "Grayson", "Eli", "Landon", "Andrew", "Max", "Samuel", "Gavin", "Wyatt", "Christian", "Hunter", "Cameron", "Evan", "Charlie", "David", "Sebastian", "Joseph", "Dominic", "Anthony", "Colton", "John", "Tyler", "Zachary", "Thomas", "Julian", "Levi", "Adam", "Isaiah", "Alex", "Aaron", "Parker", "Cooper", "Miles", "Chase", "Muhammad", "Christopher", "Blake", "Austin", "Jordan", "Leo", "Jonathan", "Adrian", "Colin", "Hudson", "Ian", "Xavier", "Camden", "Tristan", "Carson", "Jason", "Nolan", "Riley", "Lincoln", "Brody", "Bentley", "Nathaniel", "Josiah", "Declan", "Jake", "Asher", "Jeremiah", "Cole", "Mateo", "Micah", "Elliot"]
        var names2 = ["Sophia", "Emma", "Olivia", "Isabella", "Mia", "Ava", "Lily", "Zoe", "Emily", "Chloe", "Layla", "Madison", "Madelyn", "Abigail", "Aubrey", "Charlotte", "Amelia", "Ella", "Kaylee", "Avery", "Aaliyah", "Hailey", "Hannah", "Addison", "Riley", "Harper", "Aria", "Arianna", "Mackenzie", "Lila", "Evelyn", "Adalyn", "Grace", "Brooklyn", "Ellie", "Anna", "Kaitlyn", "Isabelle", "Sophie", "Scarlett", "Natalie", "Leah", "Sarah", "Nora", "Mila", "Elizabeth", "Lillian", "Kylie", "Audrey", "Lucy", "Maya", "Annabelle", "Makayla", "Gabriella", "Elena", "Victoria", "Claire", "Savannah", "Peyton", "Maria", "Alaina", "Kennedy", "Stella", "Liliana", "Allison", "Samantha", "Keira", "Alyssa", "Reagan", "Molly", "Alexandra", "Violet", "Charlie", "Julia", "Sadie", "Ruby", "Eva", "Alice", "Eliana", "Taylor", "Callie", "Penelope", "Camilla", "Bailey", "Kaelyn", "Alexis", "Kayla", "Katherine", "Sydney", "Lauren", "Jasmine", "London", "Bella", "Adeline", "Caroline", "Vivian", "Juliana", "Gianna", "Skyler", "Jordyn"]
    
        var name, isNameTaken, tries = 0;
        do {
            var nameArray = Math.random() > .5 ? names1 : names2;
            name = nameArray[Math.floor(Math.random() * nameArray.length)];
    
            if (tries > 3){
                name += nameArray[Math.floor(Math.random() * nameArray.length)];
            }
    
            tries++;
            isNameTaken = Game.creeps[name] !== undefined;
        } while (isNameTaken);

      return name;

    }

}

module.exports = spawner;
