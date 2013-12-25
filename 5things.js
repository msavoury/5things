Players = new Meteor.Collection("players");


/*
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to 5things.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.hello.helpers( {
	  has_username: function() { return false; },
  });

  Template.enter_username.events( {
	  'click input#select_username' : function () {
		  var username = $('#username').val();
		  if (username != "") {
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
*/
