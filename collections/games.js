Games = new Meteor.Collection('games');

var GameConstants = {
    //GAME STATUS
    GAME_INIT : 0,
    GAME_OVER : 1,
    GAME_WAITING : 2,
    GAME_IN_PROGRESS : 3,

    //OTHER CONSTANTS
    POINTS_PER_ANSWER : 5,
    SECONDS_PER_QUESTION : 25,
    ANSWERS_PER_QUESTION : 5,
    QUESTIONS_PER_GAME : 10

};

var GameTimers = {};

function Game() {
    this.status = GameConstants.GAME_INIT;
    this.users = [];
    this.user_count = 0; 
    this.questions = [];
    this.current_question = 0;
    this.submitted_answers = [];
    this.scores = {};
    this.question_time_remaining = GameConstants.SECONDS_PER_QUESTION;
    this.timerID
    this.add_user = function(user) {
        this.users.push(user);
        this.user_count++;
	if (this.user_count == 1) {
		this.status = GameConstants.GAME_WAITING;
	}
	else {
		this.status = GameConstants.GAME_IN_PROGRESS;
	}
        this.scores[user._id] = 0;
    };
}

function add_user_to_game(game, user) {
    game.users.push(user);
    game.user_count++;
    game.scores[user._id] = 0;
	if (game.user_count == 1) {
		game.status = GameConstants.GAME_WAITING;
	}
	else {
		game.status = GameConstants.GAME_IN_PROGRESS;
	}
}

/*
 * Add default number of questions to the game
 */
function add_questions_to_game(game) {
    var question_ids = Questions.find().fetch();
    var sampled_ids = _.sample(question_ids, GameConstants.QUESTIONS_PER_GAME);
    sampled_ids.forEach(function(entry) {
        game.questions.push(entry._id);
    });
}

Meteor.methods({

    /*
     * Assign the given user to a game. Create a new game if one 
     * doesn't already exist.
     */
    assign_user_to_game: function(user) {
        //find a game that has one user assigned
        console.log("looking for a game");

        var target_game = Games.findOne({user_count: 1});

        if (target_game != undefined) {
            console.log("game found!");
            add_user_to_game(target_game, user);
            Games.update({_id:target_game._id}, target_game);
	    var timer = Meteor.setInterval(function() {
		var game = Games.findOne(target_game._id);
		game.question_time_remaining = game.question_time_remaining - 1;
		 if (game.question_time_remaining == 0) {
		    Meteor.call('handle_next_question',game);
		 }
		 else {
		    Games.update({_id:target_game._id}, game);
		 }

	    }, 1000);
	    GameTimers[target_game._id] = timer;
            return target_game._id;
        }
        else {
            var new_game =  new Game();
            new_game.add_user(user);
            add_questions_to_game(new_game); 
            var game_id = Games.insert(new_game);
            return game_id;
        }
    },

    /*
     * Update the game to the next question in the games' question list if 
     * one is available
     */
    move_to_next_question: function(game) {
	Games.update({_id:game._id},
		{ $inc: {current_question: 1}, 
		    $set: {submitted_answers:[], question_time_remaining: GameConstants.SECONDS_PER_QUESTION}
		});
    },

    /*
     * Validate if the given answer is a valid response to the current question in the given
     * game
     */
    is_answer_correct: function(answer, game, user_id) {
        var response = {
            is_correct: false,
        };

        answer = answer.toLowerCase().trim();

        //check if answer already submitted. this test isn't
	//strictly necessary, but we are saving some time if the user
	//happens to type the answer we have set as the normalized answer
        if (game.submitted_answers.indexOf(answer) != -1) {
            return response;
        }

        var current_question_id = game.questions[game.current_question];
        var current_question = Questions.findOne(current_question_id);

	Object.keys(current_question.answers).some(function(key) {
	    if (answer == key) {
		answer = key;
		response.is_correct = true;
		return true;
	    }
	    if (current_question.answers[key].constructor === Array && current_question.answers[key].indexOf(answer) != -1) {
		answer = key;
		response.is_correct = true;
		return true;
	    }
	    return false;
	});

	//here we have to check if the given answer is part of submitted answers again,
	//because now the answer has been normalized 
        if (response.is_correct && game.submitted_answers.indexOf(answer) == -1) {
            var temp = {};
            var key = "scores."+user_id;
            temp[key] = GameConstants.POINTS_PER_ANSWER;
            Games.update({_id:game._id}, { $push: {submitted_answers: answer}, $inc: temp, });

            if (game.submitted_answers.length >= GameConstants.ANSWERS_PER_QUESTION - 1) {
		 Meteor.call('handle_next_question', game);
            }
        }
        return response;
    },

    /*
     * Move to next question if there are more questions available in the game 
     * or move to the game end state
     * */
    handle_next_question: function(game) {
	if (game.current_question < game.questions.length - 1) {
	    Meteor.call('move_to_next_question', game);
	}
	else { //game is over
	    console.log('game is over');
	    game.status = GameConstants.GAME_OVER;
	    Games.update({_id:game._id},
		    {$set:{status:GameConstants.GAME_OVER}}
	    );
	    if (GameTimers[game._id]) {
		Meteor.clearInterval(GameTimers[game._id]);
	    }
	}
    }
});
