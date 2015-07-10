Router.configure({
	layoutTemplate: 'body'
});

Router.route('/', function() {
	this.render('home');
});

Router.route('/game/:_id',  {
	data: function() { return Games.findOne(this.params._id); },
	template: 'game'
});
