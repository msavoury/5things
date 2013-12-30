
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

var questions = [
{ text: 'Name 5 of the original 13 colonies',
  answers: ['virginia','massachusetts','new hampshire','maryland','connecticut','rhode island','delaware','north carolina','south carolina','new jersey','new york','pennsylvania','georgia'],

},
{
  text: 'Name the 5 great lakes',
  answers: ['huron', 'ontario', 'michigan', 'erie', 'superior'],

},

]

Meteor.startup(function() {
	if (Players.find().count() === 0) {
		fake_players.forEach(function(entry) {Players.insert(entry);});
	}

	if (Questions.find().count() === 0) {
		questions.forEach(function(entry) {Questions.insert(entry);});
	}
});
