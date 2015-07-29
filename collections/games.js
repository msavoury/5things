Games = new Meteor.Collection('games');

var GameConstants = {
    GAME_INIT : 0,
    GAME_OVER : 1,
    GAME_WAITING : 2,
    GAME_IN_PROGRESS : 3,

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
            temp[key] = 5;
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
