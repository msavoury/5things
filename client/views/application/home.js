function has_username() {
	return Session.get('user.id') != "" && Session.get('user.id') != undefined;
}

function User(username) {
	this.username = username;
	this.status = 'idle';
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
	  'click input#select_username' : function () {
		  var username = $('#username').val();
		  if (username == undefined || username == "") {
			  alert('please enter username');
			  return;
		  }
		  var new_user;
		  if (!has_username() && username != "") {
			  //var user_id = Players.insert({username: username, status:'idle'});
			  new_user = new User(username);
			  var user_id = Players.insert(new_user);
			  Session.set('user.id', user_id);
			  Session.set('user.name', new_user.username);
		  }

		  if (has_username()) {
			  Meteor.call('assign_user_to_game', new_user, function (error, game_id) {
				  //alert(game_id);
				  Router.go('game', {_id:game_id});
			  });
		  }
	  },

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
