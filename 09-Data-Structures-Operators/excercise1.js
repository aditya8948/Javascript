'use strict';
// we are building a football betting app (soccer)
const game = {
    team1: "bayern munich",
    team2: "borrussia dortmund",
    players: [
        [  
        'never',
        'parvard',
        'alaba',
        'davies',
        'kimmich',
        'goretzka',
        'coman',
        'muller',
        'gnarby',
        'lewandowski',
    ],
    [   'burki',
        'schulz',
        'hummels',
        'akanji',
        'hakini',
        'weigl',
        'witsel',
        'hazard',
        'brandt',
        'sancho',
        'gotze',
    ],
],

score: '4:0',
scored: ['lewandowski', 'gnarby', 'lewandowski', 'hummels'],
date: 'Nov 9th, 2037',
odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
},
};


/// task 

// 1 create one player array for each team variable 'player1' an 'player2'

const [player1 ,player2] = game.players;
// console.log(player1,player2);

//2=>  create a variable for goal keeper whihch is first player and nake array for fieldPlayer 
const [gk1 , ...fieldPlayer1] = player1
const [gk2 , ...fieldPlayer2] = player2

// console.log(gk1 , fieldPlayer1)
// console.log(gk2, fieldPlayer2);

// 3=> create array which contain all player of both team 

const allPlayer = [...player1,...player2]
// console.log(allPlayer)

// 4=> add three player in final  player array which contain team 1 player and three more 

const finalPlayer = [...player1, 'thiago' ,'coutinho' ,'peristic'];
// console.log(finalPlayer);

// 5=> create variable for odds structure (nested destructuring of object )
const {
    odds: {team1 , x: draw , team2},
} = game;
// console.log(team1 , draw , team2);


// 6 => write a  function ('printGoal') that recieve an arbitrary number of player name (not an array ) and print each of them were scored (number of player passed in)

function printGoal(...numbers){
    console.log(`${numbers.length} goal is scored `);
}

printGoal('lewandowski', 'gnarby', 'lewandowski', 'hummels')
printGoal(...game.scored);

// 7=> the team with the lower odd likely to win , print the console which team 
// is moore likely to win , without using an if/else statemeent

team1 < team2 && console.log('team 1 is likely to win' );
team1 > team2 && console.log('team 2 is likely to win' );

