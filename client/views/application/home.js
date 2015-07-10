/*
 * Return whether the curren user has a username set
 */
function has_username() {
	return Session.get('user.id') != "" && Session.get('user.id') != undefined;
}

function get_username() {
	return typeof Session.get('user.id') == "undefined" ? null : Session.get('user.id');
}

function User(username) {
	this.username = username;
	this.status = 'idle';
}

/*
 *  
 */
function sign_in() {
	var username_input = $('#username').val();
	if (username_input == undefined || username_input == "") {
		alert('please enter username');
		return;
	}
	var new_user;
	var user_id;

	if (!has_username()) {
		new_user = new User(username_input);
		user_id = Players.insert(new_user);
		Session.set('user.id', user_id);
		Session.set('user.name', new_user.username);
	}

	if (has_username()) {
		user_id = get_username();
		new_user = Players.findOne(user_id);
		Meteor.call('assign_user_to_game', new_user, function (error, game_id) {
			var gameUrl = '/game/' + game_id;
			Router.go(gameUrl);
		});
	}
}

if (Meteor.isClient) {
  Template.home.events({
    'click input' : function () { }
  });

  Template.home.helpers({
	  num_of_active_games: function() {return 4;},
  });

  Template.enter_username.events( {
	  'click input#select_username' : function (event) {sign_in();},
	  'keydown input#username' : function(event) {
		  if (event.which == 13) sign_in();
	  },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
