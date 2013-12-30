Games = new Meteor.Collection('games');

function user_can_play() {
	return true;
}

function Game() {
	this.users = [];
    this.user_count = 0; 

	this.add_user = function(user_id) {
		this.users.push(user_id);
		this.user_count++;
	};
}

function add_user_to_game(game, user) {
	game.users.push(user);
	game.user_count++;
}

Meteor.methods({
	assign_user_to_game: function(user) {
		//find a game that has one user assigned
		var target_game = Games.findOne({user_count: 1});

		if (target_game != undefined) {
			add_user_to_game(target_game, user);
			Games.update({_id:target_game._id}, {$push: {users: user}, $inc: {user_count: 1}});
			return target_game._id;
		}
		else {
			var new_game =  new Game();
			new_game.add_user(user);
			var game_id = Games.insert(new_game);
			return game_id;
		}
	},


});
