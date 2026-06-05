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
        const cell = board[row][column];
        const isCellAvailable = cell === 0 ? true : false;

        if (!isCellAvailable) return;

        // places player mark on cell
        cell.addToken(player);
    };

    // prints the board to the console looping through each index and 
    // populating each index with the value of the Cell Object
    const printBoard = () => {
        // runs through each row, then runs through each index of row placing the cell value
        const populatedBoard = board.map((row) => row.map((cell) => cell.getValue()));
        
        console.log(populatedBoard)
    }

    return { getBoard, placeMark, printBoard}
}