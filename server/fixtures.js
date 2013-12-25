
var fake_players = [
    {   
        username: 'carine',
        status: 'idle',
    },  
    {   
        username: 'marcos',
        status: 'idle',
    },  
    {   
        username: 'sergio',
        status: 'active',
    },  
    {   
        username: 'kristine',
        status: 'active',
    },  

]

if (Players.find().count() == 0) {
	fake_players.forEach(function(entry) {Players.insert(entry);});
}
