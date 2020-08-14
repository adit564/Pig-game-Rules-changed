/*
GAME RULES:
- First enter your Winning score
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 or 2 6 , all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
*/


// Set variables to store scores , roundScore , activePlayer

var scores, roundScore, activePlayer, gamePlaying, totalScore;

init();

document.getElementById('submit1').addEventListener('click', function() {
    totalScore = document.getElementById('value1').value;
    alert("Get " + totalScore + " points to WIN");
});



// Adding and click event and an anonymous function to be executed while the button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // Getting a random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var score6 = 6;

        // displaying the resulting dice image 
        var diceDOM = document.querySelector('.dice');
        var diceDOM1 = document.querySelector('.dice-1');
        diceDOM.style.display = 'block';
        diceDOM1.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        // Updating the roundScore Only if the dice is not rolled 1 If it is one then the activePlayer score is 0 and the turn goes to another player
        if (dice === score6 && dice1 === score6) {
            nextPlayer();
        } else if (dice !== 1 && dice1 !== 1) {
            //Add score
            roundScore += dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }

});

// A new click event for Hold btn and adding a anonymous function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Updating the total score 
        scores[activePlayer] += roundScore;
        // Updating the UI(User Interface)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if the Player has Won 
        if (scores[activePlayer] >= totalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }

    }

});

















function nextPlayer() {

    // This is in all for the next Player!
    // If the dice rolls  1 then  roundScore === 0 and change player and  activePlayer interface 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    // Changing the active player interface
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // Hiding the dice image while changing turns
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}

// Adding a new click event on New game btn and passing a init function
document.querySelector('.btn-new').addEventListener('click', init);




function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Hiding the dice image before the game starts
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    // Setting the value of scores to 0 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}