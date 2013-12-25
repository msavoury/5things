function has_username() {
	return Session.get('user.id') != "" && Session.get('user.id') != undefined;
}

if (Meteor.isClient) {
  Template.home.events({
    'click input' : function () { }
  });

  Template.home.helpers( {
	  has_username: function() { return false; },
  });

  Template.enter_username.events( {
	  'click input#select_username' : function () {
		  var username = $('#username').val();
		  if (!has_username() && username != "") {
			  var user_id = Players.insert({username: username, status:'idle'});
			  Session.set('user.id', user_id);
			  Session.set('user.name', username);
		  }

		  if (has_username()) {
			  Router.go('lobby');
		  }
	  },

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
