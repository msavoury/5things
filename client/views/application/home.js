Template.home.helpers({
/*
 * Return whether the current user has a username set
 */
    has_username: function() {
        return Session.get('user.id') != "" && Session.get('user.id') != undefined;
    },
});

Template.greeting.helpers({
    get_username: function() {
	return Session.get('user.name');
    }
});

/*
 * Return the current username if set or null 
 */
function get_username() {
 return typeof Session.get('user.id') == "undefined" ? null : Session.get('user.id');
}

function has_username() {
        return Session.get('user.id') != "" && Session.get('user.id') != undefined;
 }

function User(username) {
	this.username = username;
	this.status = 'idle';
}

/*
 *  
 */
//todo: clean this method up
function sign_in() {
	var new_user;
	var user_id;

	if (!has_username()) {
	    var username_input = sanitizeString($('#username').val());
	    if (username_input == undefined || username_input == "") {
		alert('Please enter a username');
		return;
	    }
	    new_user = new User(username_input);
	    user_id = Players.insert(new_user);
	    Session.set('user.id', user_id);
	    Session.set('user.name', new_user.username);
	}

	user_id = get_username();
	new_user = Players.findOne(user_id);
	Meteor.call('assign_user_to_game', new_user, function (error, game_id) {
		var gameUrl = '/game/' + game_id;
		Router.go(gameUrl);
	});
}

if (Meteor.isClient) {
  Template.home.helpers({
	  num_of_active_games: function() {return 4;},
  });

  Template.enter_username.events( {
	  'click input#select_username' : function (event) {sign_in();},
	  'keydown input#username' : function(event) {
		  if (event.which == 13) sign_in();
	  },
  });
  Template.greeting.events( {
	  'click input#play' : function (event) {sign_in();},
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
