function Gameboard() {
    const rows = 3;
    const columns = 3
    const board = [];

    // create a 2d array to serve as a gameboard
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // function to display board
    // to be used when displaying UI
    const getBoard = () => board;

    // checks whether the cell is available in the given coordinate
    // if it isnt abort, else place player mark
    const placeMark = (row, column, player) => {
        // cell = board[row][column];
        const isCellAvailable = board[row][column] === 0 ? false : true;

        if (!isCellAvailable) return;

        // places player mark on cell
        board[row][column].addMark(player);
    };

    // prints the board to the console looping through each index and 
    // populating each index with the value of the Cell Object
    const printBoard = () => {
        // runs through each row, then runs through each index of row placing the cell value
        const populatedBoard = board.map((row) => row.map((cell) => cell.getMark()));
        
        console.log(populatedBoard)
    }

    return { getBoard, placeMark, printBoard}
}

// creates the mark for the player
function Cell() {
    let value = 0;

    // accepts a mark and replaces "value" with said mark
    // player1 mark = 1
    // player2 mark = 2
    // actual X and O marks are to be done in the UI
    const addMark = (player) => {
        value = player;
    };

    // returns the mark
    const getMark = () => value;

    return {
        addMark,
        getMark
    }
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    // initialize variable and function to check if player has won
    let hasPlayerWon;
    const getHasPlayerWon = () => hasPlayerWon;

    // creates an board for the game
    const board = Gameboard();

    // creates players one and two objects in "players" array
    const players = [
        {
            name: playerOneName,
            mark: 1,
        },
        {
            name: playerTwoName,
            mark: 2,
        }
    ];

    // starts the game with player1's turn
    let currentPlayer = players[0]

    // toggles currentPlayer
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    //gets the current player
    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {
        // check if a player has won, if true return
        console.log(hasPlayerWon)
        if (hasPlayerWon) return

        
        // places current player mark
        // console.log(`setting ${getCurrentPlayer().name}'s mark into cell in column ${column} of row ${row}`);
        board.placeMark(row, column, getCurrentPlayer().mark)

        // WIN LOGIC GOES HERE
        // after every move check if every index of that row is the player's mark, if it is, player has won and return
        // for (let i = 0; i < 3; i++) {
        //     console.log(board.getBoard()[i][column].getMark())
        // }
        if (board.getBoard()[row].every((cell) => cell.getMark() === getCurrentPlayer().mark)) {
            console.log(`player ${getCurrentPlayer().name} has won`)
            hasPlayerWon = getCurrentPlayer().name
            board.printBoard()
            return
        }

        // then check that column, then return
        if (board.getBoard().every((boardRow) => boardRow[column].getMark() === getCurrentPlayer().mark)) {
            console.log(`player ${getCurrentPlayer().name} has won`)
            hasPlayerWon = getCurrentPlayer().name
            board.printBoard()
            return
        }

        // then every diagonal, then return

        switchPlayerTurn()
        printNewRound()
    }

    // initial round
    printNewRound()

    // console only needs playRound
    // but use getActivePlayer for UI
    return {
        playRound,
        getCurrentPlayer,
        getHasPlayerWon,
    };
}

const game = GameController();

game.playRound(0, 0)
game.playRound(2, 2)

game.playRound(1, 0)
game.playRound(2, 1)

game.playRound(2, 0)
game.playRound(1, 1)
console.log(game.getHasPlayerWon())

// need to fix verification if cell already has a mark in "placeMark"