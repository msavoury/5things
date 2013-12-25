//Players = new Meteor.Collection("players");
//

function has_username() {
	return Session.get('user.id') != "";
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
			  var user_id = Players.insert({username: username});
			  Session.set('user.id', user_id);
			  Session.set('user.name', username);
		  }
	  },

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
