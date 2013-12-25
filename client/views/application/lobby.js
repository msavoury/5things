Template.lobby.helpers({
	num_of_active_players: function() {
		return Players.find({status: 'active'}).count();
	},
	num_of_idle_players: function() {
		return Players.find({status: 'idle'}).count();
	},
	num_of_games: function() {
		return Games.find().count();
	},
	user_can_play: function() {
		return Players.find({status: 'idle'}).count() > 1;
	},

});
