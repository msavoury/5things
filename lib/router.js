Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {path: '/'});
	this.route('game', {path: '/game'});
	this.route('lobby', {path: '/lobby'});
});
