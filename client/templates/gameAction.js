Template.gameAction.helpers({
    logged_in_score: function() {
        return this.scores[Session.get('user.id')];
    },
    other_username: function() {
        if (this.users[0].username == Session.get('user.name')) {
            return this.users[1].username;
        }
        else {
            return this.users[0].username;
        }
    },
    other_user: function() {
        if (this.users[0].username == Session.get('user.name')) {
            return this.users[1];
        }
        else {
            return this.users[0];
        }
    },
    other_score: function() { //TODO: Figure out how to call other functions in same helper so that the other_user function can be reused
        var other;
        if (this.users[0].username == Session.get('user.name')) {
            other = this.users[1];
        }
        else {
            other = this.users[0];
        }
        return this.scores[other._id];
    },

    get_current_question_text: function() {
        var current_question_num = this.current_question;
        var current_question_id = this.questions[current_question_num];
        var current_question = Questions.findOne(current_question_id);
        return current_question.text;
    },
    get_question_time_remaining: function() {
	return this.question_time_remaining;
    },
});

Template.gameAction.events({
      'keypress input#answer' : function(event) {
	  $('#answer').parent().removeClass('has-error');
	  $('#answer').parent().removeClass('has-success');
          if (event.which == 13) {
              var answer = $('#answer').val();
	      answer = sanitizeString(answer);
              if (answer != "") {
                  Meteor.call('is_answer_correct', answer, this, Session.get('user.id'), function(error, response) {
                      if (response.is_correct) {
                            $('#answer').val('');
			    $('#answer').parent().addClass('has-success');
                      }
                      else {
			  $('#answer').parent().addClass('has-error');
                          $('#answer').fadeOut(100);
                          $('#answer').fadeIn(100);
                      }
                  });
              }
          }
      }
});
