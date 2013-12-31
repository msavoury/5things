Games = new Meteor.Collection('games');

function user_can_play() {
	return true;
}

function Game() {
	this.users = [];
    this.user_count = 0; 

	this.questions = [];
	this.current_question = 0;

	this.submitted_answers = [];

	this.scores = {};

	this.add_user = function(user) {
		this.users.push(user);
		this.user_count++;
		this.scores[user._id] = 0;
	};
}

function add_user_to_game(game, user) {
	game.users.push(user);
	game.user_count++;
	game.scores[user._id] = 0;
}

function add_questions_to_game(game, num_of_questions) {
	var question_ids = Questions.find(); 
	question_ids.forEach(function(entry) {
		game.questions.push(entry._id);
	});

}

Meteor.methods({
	assign_user_to_game: function(user) {
		//find a game that has one user assigned
		var target_game = Games.findOne({user_count: 1});

		if (target_game != undefined) {
			add_user_to_game(target_game, user);
			Games.update({_id:target_game._id}, target_game);
			return target_game._id;
		}
		else {
			var new_game =  new Game();
			new_game.add_user(user);
			add_questions_to_game(new_game, 2); //TODO: remove magic number
			var game_id = Games.insert(new_game);
			return game_id;
		}
	},

	is_answer_correct: function(answer, game, user_id) {
		if (game.submitted_answers.indexOf(answer) != -1) {
			return false;
		}
		var current_question_id = game.questions[game.current_question];
		var current_question = Questions.findOne(current_question_id);

		if (current_question.answers.indexOf(answer) != -1) {
			Games.update({_id:game._id}, {
				                            $push: {submitted_answers: answer},
										});
			//TODO: give player points

			if (game.submitted_answers.length >= 4) {
				if (game.current_question < game.questions.length - 1) {
					Games.update({_id:game._id}, {
												  $inc: {current_question: 1}, 
						                          $set: {submitted_answers:[]}
					                             }
								);
				}
			}
		}

	}


});
