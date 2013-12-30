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
	},

	get_current_question_text: function() {
		var current_question_num = this.current_question;
		var current_question_id = this.questions[current_question_num];
		var current_question = Questions.findOne(current_question_id);
		return current_question.text; 
	},
});

Template.gameAction.events({
	  'click input#submit' : function () {
		  var answer = $('#answer').val();
		  if (answer != "") {
			  Meteor.call('is_answer_correct', answer, this, Session.get('user.name'), function(error, result) {
			  });
		  }
	  }

});
