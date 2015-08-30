var questions = [
{
    version: 1,
    text: 'Name 5 common pizza toppings',
    answers : { 
	'pepperoni' : [],
	'sausage' : [],
	'italian sausage' : [],
	'bacon' : [],
	'ham' : [],
	'pineapple' : ['pineapples'],
	'pepper' : ['peppers'],
	'onion' : ['onions'],
	'mushroom' : ['mushrooms'],
	'chicken' : [],
	'olive' : ['olives', 'green olive', 'green olives'],
    }
},
{
    version: 1,
    text: 'Name 5 of Snow White\'s Seven Dwarfs',
    answers : { 
	'doc' : [],
	'dopey' : [],
	'bashful' : [],
	'grumpy' : [],
	'sneezy' : [],
	'sleepy' : [],
	'happy' : [],
    }
},
{
    version: 1,
    text: 'Name 5 months with 31 days',
    answers : { 
	'january' : [],
	'march' : [],
	'may' : [],
	'july' : [],
	'august' : [],
	'october' : [],
	'december' : [],
    }
},
{
    version: 1,
    text: 'Name 5 countries that have won the World Cup at least once',
    answers : { 
	'brazil' : [],
	'italy' : [],
	'germany' : [],
	'argentina' : [],
	'uruguay' : [],
	'france' : [],
	'england' : [],
	'spain' : [],
    }
},
{
    version: 1,
    text: 'Name 5 states that start with the letter "M"',
    answers : { 
	'massachusetts' : [],
	'maine' : [],
	'maryland' : [],
	'michigan' : [],
	'minnesota' : [],
	'mississippi' : [],
	'missouri' : [],
	'montana' : [],
    }
},
{
    version: 1,
    text: 'Name the 5 of the original 13 US colonies',
    answers : { 
	'virginia' : [],
	'massachusetts' : [],
	'new hampshire' : [],
	'maryland' : [],
	'connecticut' : [],
	'rhode island' : [],
	'delaware' : [],
	'north carolina' : [],
	'south carolina' : [],
	'new jersey' : [],
	'new york' : [],
	'pennsylvania' : [],
	'georgia' : [],
    }
},
{
    version: 1,
    text: 'Name the 5 great lakes',
    answers : { 
	'huron' : [],
	'superior' : [],
	'ontario' : [],
	'michigan' : [],
	'erie' : [],
    }
},
{
    version: 1,
    text: 'Name 5 of Santa Claus Reindeer',
    answers : { 
	'dasher' : [],
	'dancer' : [],
	'prancer' : [],
	'vixen' : [],
	'comet' : [],
	'cupid' : [],
	'donner' : [],
	'blitzen' : [],
	'rudolph' : [],
    }
},
{
    version: 1,
    text: 'Name 5 of the original sesame street characters',
    answers : { 
	'kermit' : ['kermit the frog'],
	'cookie monster' : ['the cookie monster'],
	'bert' : [],
	'ernie' : [],
	'comet' : [],
	'elmo' : [],
	'count' : ['the count'],
	'oscar' : ['oscar the grouch', 'grouch', 'the grouch'],
    }
},
{
    version: 1,
    text: 'Name 5 Disney&copy; princesses',
    answers : { 
	'cinderella' : [],
	'belle' : [],
	'rapunzel' : [],
	'snow white' : [],
	'ariel' : [],
	'mulan' : [],
	'aurora' : [],
	'jasmine' : [],
	'merida' : [],
	'pocahontas' : [],
    }
},
{
    version: 1,
    text: 'Name 5 planets in the solar system',
    answers : { 
	'mercury' : [],
	'venus' : [],
	'earth' : [],
	'mars' : [],
	'jupiter' : [],
	'saturn' : [],
	'uranus' : [],
	'neptune' : [],
	'sun' : ['the sun'],
    }
},
];

Meteor.startup(function() {
    	console.log("Meteor starting up");
	if (Questions.find().count() === 0) {
	    	console.log("Adding questions to db");
		questions.forEach(function(entry) {Questions.insert(entry);});
	}
});
