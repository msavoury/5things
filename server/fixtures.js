
var questions = [
// {
//   text: 'Name 5 months with 31 days',
//   answers: ['january', 'march', 'may', 'july', 'august','october','december'],
// },
// {
//   text: 'Name 5 states that start with the letter "M"',
//   answers: ['maine', 'maryland', 'massachusetts', 'michigan', 'minnesota','mississippi','missouri','montana'],
// },
// {
//   text: 'Name 5 countries that have won the World Cup at least once',
//   answers: ['brazil', 'italy', 'germany', 'argentina', 'uruguay','france','england','spain'],
// },
// {
//   text: 'Name 5 of Snow White\'s Seven Dwarfs',
//   answers: ['doc', 'dopey', 'bashful', 'grumpy', 'sneezy','sleepy','happy'],
// },
// { 
//   text: 'Name 5 of the original 13 US colonies',
//   answers: ['virginia','massachusetts','new hampshire','maryland','connecticut','rhode island','delaware','north carolina','south carolina','new jersey','new york','pennsylvania','georgia'],
// },
{
  text: 'Name the 5 great lakes',
  answers: ['huron', 'ontario', 'michigan', 'erie', 'superior'],
},
// {
//   text: 'Name 5 of the 7 deadly sins',
//   answers: ['lust', 'gluttony', 'greed', 'sloth', 'wrath','envy','pride'],
// },
// {
//   text: 'Name 5 of Santa Claus\' Reindeer',
//   answers: ['dasher', 'dancer', 'prancer', 'vixen', 'comet', 'cupid', 'donner', 'blitzen', 'rudolph'],
// },
{
  text: 'Name 5 of the original Sesame Street characters',
  answers: ['kermit', 'cookie monster', 'bert', 'ernie', 'comet', 'grouch', 'elmo', 'count'],
},
]

Meteor.startup(function() {
	if (Questions.find().count() === 0) {
		questions.forEach(function(entry) {Questions.insert(entry);});
	}
});
