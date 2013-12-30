Template.game.helpers({
	logged_in_username: function () {
		return Session.get('user.name');
	},

    game_is_ready: function(game) {
		return this.user_count > 1;
	},

});

Template.gameAction.helpers({
	//TODO: remove the duplication of this function 
	logged_in_username: function () {
		return Session.get('user.name');
	},
	other_username: function() {
		if (this.users[0].username == Session.get('user.name')) {
			return this.users[1].username;
		}
		else {
			return this.users[0].username;
		}
	}
});
