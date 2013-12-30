Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {path: '/'});
	this.route('game', {path: '/game/:_id',
	                    data: function() {return Games.findOne(this.params._id);}});
	this.route('lobby', {path: '/lobby'});
});
