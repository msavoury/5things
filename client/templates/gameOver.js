Template.gameOver.helpers({
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
    result: function() {
	var other;
	var user;
        if (this.users[0].username == Session.get('user.name')) {
            other = this.users[1];
	    user = this.users[0];
        }
        else {
            other = this.users[0];
	    user = this.users[1];
        }

	if (this.scores[other._id] == this.scores[user._id]) {
	    return 'Tie!';
	}
	else if  (this.scores[other._id] > this.scores[user._id]) {
	    return 'Winner: ' + other.username;
	}
	else {
	    return 'Winner: ' + Session.get('user.name');
	}
    }

});
