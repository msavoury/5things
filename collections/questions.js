Questions = new Meteor.Collection('questions');

function Question() {
	this.text ="";
	this.answers = [];
}

