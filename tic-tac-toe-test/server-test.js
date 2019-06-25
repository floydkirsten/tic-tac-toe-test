var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    function callback(err, data) {``
        console.log(req.url);
        if (err) throw err;
        let contentType = "text/html";
        if (req.url === '/style-test.css') contentType = "text/css";
        if (req.url === '/server-test.js') contentType = "application/javascript";
        console.log(contentType);
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    }
    if (req.url === '/') fs.readFile('./display-test.html', callback)
    else if (req.url !== '/favicon.ico'){
        console.log(req.url);
        fs.readFile("." + req.url, callback);
    }

}).listen(8000);



//game
var board = [ // 2D array signifying the board
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var currentPlayer = 1; // Player whos turn it currently is
var turnNumber = 1;  // Number of the current turn
var previousLoser = 1; // Loser of the previous game

var gameOver = 0 // Whether or not the game is currently over

var playerOneWins = 0; // How many wins for player 1
var playerTwoWins = 0; // How many wins for player 2
var draws = 0; // Number of draws

function getCurrentPlayer() { return currentPlayer; } // Returns the current player
function getPlayerOneWins() { return playerOneWins; } // Returns the number of wins for player 1
function setPlayerOneWins(wins) { playerOneWins = wins; } // Sets the number of wins for player 1
function getPlayerTwoWins() { return playerTwoWins; } // Returns the number of wins for player 2
function setPlayerTwoWins(wins) { playerTwoWins = wins; } // Sets the number of wins for player 2
function getDraws() { return draws; } // Returns the number of draws
function setDraws(draws) { draws = draws; } // Sets the number of draws


function move(row, column, button) { // Performs a move for the current player
    if (gameOver) { 
        window.alert("The game is over!"); // Checks if the game is already over
    }
    else if(board[row][column] != 0) // Checks if there the selected space has already been selected
    {
        window.alert("That space has already been chosen!");
    }
    else {
        document.getElementById(button).innerHTML = currentPlayer == 1 ? 'X' : 'O'; 
        board[row][column] = currentPlayer; // Sets the correct space to the current player
        checkWin();
        if (currentPlayer == 1) currentPlayer = 2; // Changes current player
        else currentPlayer = 1;
    }

    if (currentPlayer == 1) {
        document.getElementById('turn-text').innerHTML = "Player 1's Turn";
    } else {
        document.getElementById('turn-text').innerHTML = "Player 2's Turn";
    }
}

function checkWin() { // Checks to see if a win condition has been met
    if (checkEqual(board[0])) win(board[0][0]); // Checks the first row
    else if (checkEqual(board[1])) win(board[1][0]); // Checks the second row
    else if (checkEqual(board[2])) win(board[2][0]); // Checks the third row
    else if (checkEqual([board[0][0], board[1][0], board[2][0]])) win(board[0][0]); // Checks the first column
    else if (checkEqual([board[0][1], board[1][1], board[2][1]])) win(board[0][1]); // Checks the second column
    else if (checkEqual([board[0][2], board[1][2], board[2][2]])) win(board[0][2]); // Checks the third column
    else if (checkEqual([board[0][0], board[1][1], board[2][2]])) win(board[0][0]); // Checks the first diagonal
    else if (checkEqual([board[2][0], board[1][1], board[0][2]])) win(board[2][0]); // Checks the second diagonal
    else if (turnNumber == 9) win(0); // Ends the game if there is a draw

    if (!gameOver) turnNumber ++; // Advances the turn number while the game is not over
}

function win(winner) { // Makes changes to the game if a player has won
    if (winner == 1) { // Player 1 is the winner
        playerOneWins ++;
        previousLoser = 2;
        window.alert("Player 1 Wins!");
        document.getElementById('oneWins').innerHTML = "Player 1 wins: " + playerOneWins;
    }
    else if (winner == 2) { // Player 2 is the winner
        playerTwoWins ++;
        previousLoser = 1;
        window.alert("Player 2 Wins!");
        document.getElementById('twoWins').innerHTML = "Player 2 wins: " + playerTwoWins;
    }
    else { // There was a draw
        draws ++;
        if (previousLoser == 1) previousLoser = 2;
        else previousLoser = 1;
        window.alert("It's a Draw!");
        document.getElementById('draws').innerHTML = "Draws: " + draws; 
    }
    gameOver = 1;
}

function checkEqual(row) { // Checks if the input array is equal at all elements
    if(row[0] == row[1] && row[1] == row[2] && row[0] != 0) return true;
    return false;
}

function reset() { // Resets the game board but not the wins
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    currentPlayer = previousLoser;
    turnNumber = 1;
    gameOver = 0;
    for(var i=1;i<10;i++) {
        document.getElementById(i).innerHTML = '';
    }
    if (currentPlayer == 1) {
        document.getElementById('turn-text').innerHTML = "Player 1's Turn";
    } else {
        document.getElementById('turn-text').innerHTML = "Player 2's Turn";
    }
}

function resetWins() {
    playerOneWins = 0;
    playerTwoWins = 0;
    document.getElementById('oneWins').innerHTML = "Player 1 wins: " + playerOneWins;
    document.getElementById('twoWins').innerHTML = "Player 2 wins: " + playerTwoWins;
}