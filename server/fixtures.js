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
	'cheese' : [],
	'tomato' : ['tomatoes'],
	'anchovy' : ['anchovies'],
    }
},
{
    version: 1,
    text: 'Name 5 elements with an atomic number less than 15',
    answers : { 
	'hydrogen' : [],
	'helium' : [],
	'lithium' : [],
	'beryllium' : [],
	'boron' : [],
	'carbon' : [],
	'nitrogen' : [],
	'oxygen' : [],
	'fluorine' : [],
	'neon' : [],
	'sodium' : [],
	'magnesium' : [],
	'aluminum' : [],
	'silicon' : [],
    }
},
{
    version: 1,
    text: 'Name 5 common games played with a standard deck of cards',
    answers : { 
	'solitaire' : [],
	'poker' : [],
	'hearts' : [],
	'spades' : [],
	'bridge' : [],
	'war' : [],
	'spit' : [],
	'freecell' : ['free cell'],
	'crazy eights' : [],
	'go fish' : [],
	'bullshit' : [],
	'blackjack' : ['21'],
	'gin rummy' : ['rummy'],
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
    text: 'Name 5 common types of wood',
    answers : { 
	'oak' : [],
	'maple' : [],
	'mahogany' : [],
	'cherry' : [],
	'walnut' : [],
	'teak' : [],
	'pine' : [],
	'ash' : [],
	'hickory' : [],
	'beech' : [],
	'birch' : [],
	'cedar' : [],
	'redwood' : [],
	'hemlock' : [],
	'fir' : [],
	'spruce' : [],
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
    text: 'What are 5 prime numbers between 20 and 100?',
    answers : { 
	'23' : [],
	'29' : [],
	'31' : [],
	'37' : [],
	'41' : [],
	'47' : [],
	'53' : [],
	'59' : [],
	'61' : [],
	'67' : [],
	'71' : [],
	'73' : [],
	'79' : [],
	'83' : [],
	'89' : [],
	'97' : [],
    }
},
{
    version: 1,
    text: 'Name 5 countries that have won the FIFA World Cup at least once',
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
	'big bird' : [],
	'elmo' : [],
	'count' : ['the count'],
	'oscar' : ['oscar the grouch', 'grouch', 'the grouch'],
    }
},
{
    version: 1,
    text: 'Name 5 Disney princesses',
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
    	console.log("Adding questions to db");
	Questions.remove({});
//	if (Questions.find().count() === 0) {
		questions.forEach(function(entry) {Questions.insert(entry);});
//	}
});
