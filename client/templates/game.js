Template.game.helpers({
    game_is_ready: function(game) {
	return this.user_count > 1;
        //return this.status == GameConstants.GAME_IN_PROGRESS;
    },
    game_is_over: function(game) {
	return true;
	//return this.status == 1;
	//return this.status == GameConstants.GAME_OVER;
    }
});

