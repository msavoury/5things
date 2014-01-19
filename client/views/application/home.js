function has_username() {
	return Session.get('user.id') != "" && Session.get('user.id') != undefined;
}

function User(username) {
	this.username = username;
	this.status = 'idle';
}

function sign_in() {
	var username = $('#username').val();
	if (username == undefined || username == "") {
		alert('please enter username');
		return;
	}
	var new_user;
	if (!has_username() && username != "") {
		new_user = new User(username);
		var user_id = Players.insert(new_user);
		Session.set('user.id', user_id);
		Session.set('user.name', new_user.username);
	}

	if (has_username()) {
		new_user = Players.findOne(user_id);
		Meteor.call('assign_user_to_game', new_user, function (error, game_id) {
			Router.go('game', {_id:game_id});
		});
	}
}

if (Meteor.isClient) {
  Template.home.events({
    'click input' : function () { }
  });

  Template.home.helpers( {
	  has_username: function() { return false; },
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
