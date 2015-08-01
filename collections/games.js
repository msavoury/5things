Games = new Meteor.Collection('games');

var GameConstants = {
    //GAME STATUS
    GAME_INIT : 0,
    GAME_OVER : 1,
    GAME_WAITING : 2,
    GAME_IN_PROGRESS : 3,

    //OTHER CONSTANTS
    POINTS_PER_ANSWER : 5

};

function Game() {
    this.status = GameConstants.GAME_INIT;
    this.users = [];
    this.user_count = 0; 
    this.questions = [];
    this.current_question = 0;
    this.submitted_answers = [];
    this.scores = {};
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
 * Add all known questions to the game
 */
//TODO: make it so that only a given number of questions are randomly assigned to the game
function add_questions_to_game(game) {
    var question_ids = Questions.find(); 
    question_ids.forEach(function(entry) {
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
            console.log("game status is " + target_game.status);
            add_user_to_game(target_game, user);
            console.log("game status now is " + target_game.status);
            Games.update({_id:target_game._id}, target_game);
	    // var cursor = Games.find({_id:target_game._id});
	    // cursor.observeChanges
            return target_game._id;
        }
        else {
            console.log("no game found - creating one");
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
    move_to_next_question: function(game, user_id) {
	//only move to next question if we are getting request from user[0]. That way we
	//ensure only one user is the one moving the questions along
	if (game.users[0]._id == user_id) {
	    //This game update is repeated in the is_answer correct function
	    //it should be moved to one place
	    //TODO: refactor
	    Games.update({_id:game._id},
		    { $inc: {current_question: 1}, 
			$set: {submitted_answers:[]}
		    });
	}
    },

    /*
     * Validate if the given answer is a valid response to the current question in the given
     * game
     */
    is_answer_correct: function(answer, game, user_id) {
        var response = {
            is_correct: false,
        };

        //TODO: trim the answer here 
        answer = answer.toLowerCase();

        //answer already submitted
        if (game.submitted_answers.indexOf(answer) != -1) {
            return response;
        }

        var current_question_id = game.questions[game.current_question];
        var current_question = Questions.findOne(current_question_id);

        if (current_question.answers.indexOf(answer) != -1) {
            response.is_correct = true;
            var temp = {};
            var key = "scores."+user_id;
            temp[key] = GameConstants.POINTS_PER_ANSWER;
            Games.update({_id:game._id}, { $push: {submitted_answers: answer}, $inc: temp, });

            if (game.submitted_answers.length >= 4) {
                if (game.current_question < game.questions.length - 1) {
                    Games.update({_id:game._id},
                        { $inc: {current_question: 1}, 
                              $set: {submitted_answers:[]}
                            });
                }
		else { //game is over
		    console.log('game is over');
		    game.status = GameConstants.GAME_OVER;
                    Games.update({_id:game._id},
			    {$set:{status:GameConstants.GAME_OVER}}
			    );
		}
            }
        }
        return response;
    }
});
