
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
        status: 'playing',
    },  
    {   
        username: 'kristine',
        status: 'playing',
    },  

]

if (Players.find().count() == 0) {
	fake_players.forEach(function(entry) {Players.insert(entry);});
}
