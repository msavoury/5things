var game_players = [
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
Template.lobby.helpers({
	num_of_active_players: function() {
		return 5;
	},
	num_of_idle_players: function() {
		return 15;
	},
	num_of_games: function() {
		return Games.find().count();
	},
	user_can_play: function() {
		return Players.find({status: 'idle'}).count() > 1;
	},

});
