// import chesspieces from "../assets/chesspieces.jsx"; // Import chess pieces if needed


// Dont use react hooks in conditional statements
const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
function getSquareIndex(square) {

  const cols = "abcdefgh";
  const rows = "87654321";

  const col = square[0];
  const row = square[1];

  const colIndex = cols.indexOf(col);
  const rowIndex = rows.indexOf(row);

  return rowIndex * 8 + colIndex;
}

function isDiagonal(fromSquare, toSquare, board) {


  // const MaxCol = fromSquare[0] > toSquare[0] ? fromSquare[0] : toSquare[0];
  // const MinCol = fromSquare[0] < toSquare[0] ? fromSquare[0] : toSquare[0];

  // const MaxRow = parseInt(fromSquare[1]) > parseInt(toSquare[1]) ? parseInt(fromSquare[1]) : parseInt(toSquare[1]);
  // const MinRow = parseInt(fromSquare[1]) < parseInt(toSquare[1]) ? parseInt(fromSquare[1]) : parseInt(toSquare[1]);
  const fromCol = alpha.indexOf(fromSquare[0]);
  const fromRow = parseInt(fromSquare[1]);
  const toCol = alpha.indexOf(toSquare[0]);
  const toRow = parseInt(toSquare[1]);
  const horDist = Math.abs(toCol - fromCol);
  const verDist = Math.abs(toRow - fromRow);

  const colStep=toCol>fromCol ?1: -1//colStep is 1 if moving right, -1 if moving left.
  const rowStep= toRow>fromRow ?1: -1 //rowStep is 1 if moving up, -1 if moving down.
  // Check if movement is diagonal
  if (horDist !== verDist) return false;

  // Check for any pieces between source and destination
  for (let i = 1; i < horDist; i++) {
    const intermediateCol = alpha[fromCol + i * colStep];
    const intermediateRow = fromRow + i * rowStep;
    const sq = `${intermediateCol}${intermediateRow}`;

    
   

    if (board[getSquareIndex(sq)].piece !== "") {
      
      console.log(`Something in between->${sq}`, board[getSquareIndex(sq)].piece);
      return false;
    }
  }

  return true;
}

// function inBetween(fromSquare,toSquare,board){

//   const fromCol = alpha.indexOf(fromSquare[0]);
//   const fromRow = parseInt(fromSquare[1]);
//   const toCol = alpha.indexOf(toSquare[0]);
//   const toRow = parseInt(toSquare[1]);
 

//   if(fromCol==toCol){//same col.
//     const diff=Math.abs(fromRow-toRow)
//     const direction=toCol>fromCol?1:-1

//     for(let i=1; i<diff;i++){
//       const sq=fromCol+(fromRow+i*direction)
//       if(board[sq]!=""){return false}
//     }

//   }
//   else if(fromRow==toRow){
//     const diff=Math.abs(fromCol-toCol )
// const direction= toCol > fromCol ? 1 : -1;

// for(let i=1; i<diff;i++){
//       const sq=fromCol+(fromRow+i*direction)
//       if(board[sq]!=""){return false}
//     }
//   }
//   return true;
// }

function inBetween(fromSquare, toSquare, board) {
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const fromCol = alpha.indexOf(fromSquare[0]);
  const fromRow = parseInt(fromSquare[1]);
  const toCol = alpha.indexOf(toSquare[0]);
  const toRow = parseInt(toSquare[1]);

  // Vertical movement (same column)
  if (fromCol === toCol) {
    const diff = Math.abs(fromRow - toRow);
    const direction = toRow > fromRow ? 1 : -1;
console.log('rook same col')
    for (let i = 1; i < diff; i++) {
      const sq = `${alpha[fromCol]}${fromRow + i * direction}`;
   
      if (board[getSquareIndex(sq)].piece !== "") {
        console.log(`Piece found in between at ${sq}`);
        return false;
      }
    }
  }
  // Horizontal movement (same row)
  else if (fromRow === toRow) {
    const diff = Math.abs(fromCol - toCol);
    const direction = toCol > fromCol ? 1 : -1;

    for (let i = 1; i < diff; i++) {
      const sq = `${alpha[fromCol + i * direction]}${fromRow}`;
      if (board[getSquareIndex(sq)].piece !== "") {
        console.log(`Piece found in between at ${sq}`);
        return false;
      }
    }
  }

  return true;
}
function isKnightMove(fromSquare, toSquare, board) {
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const fromCol = alpha.indexOf(fromSquare[0]);
  const fromRow = parseInt(fromSquare[1]);
  const toCol = alpha.indexOf(toSquare[0]);
  const toRow = parseInt(toSquare[1]);

  // Calculate the row and column differences
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  // Knight moves in an "L" shape: two squares in one direction, one in the other
  if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
    // Move is valid if destination square is empty or has an opponent piece
    if (!board[getSquareIndex(toSquare)].piece || board[getSquareIndex(toSquare)].piece[0] === 'w') {
      return true;
    } else {
      console.log("Square occupied by friendly piece");
      return false;
    }
  } else {
    return false; // Not a valid knight move
  }
}


export const IsLegalMove = (fromSquare, toSquare, draggedPiece,board) => {
  

  if (!draggedPiece) return false; // No piece to move
  if (fromSquare === toSquare) return false; // Can't move to the same square

  // Implement rules for different piece movements

  const pieceType = draggedPiece; // e.g., chesspieces.bP, chesspieces.wR, etc.

  // Example rules: Check for legal moves based on piece type
  if (draggedPiece[0] === "b" && board[getSquareIndex(toSquare)].piece[0]!=="b") {
    switch (pieceType) {
      case "bP": // Black Pawn
        // Implement logic for black pawn movement
        if (fromSquare[0] === toSquare[0] && fromSquare[1] > toSquare[1]) {
          // console.log("piece type is", pieceType);
          console.log('piece on desstination is ',board[getSquareIndex(toSquare)].piece[0])
          return true;
        } else {
          return false;
        }
      case "bB":
        if(isDiagonal(fromSquare,toSquare,board)){
          return true
        }
        else{
          return false
        }

      case "bR":
        if (inBetween(fromSquare,toSquare,board) && (fromSquare[0] === toSquare[0] || fromSquare[1] === toSquare[1] )
          ){
          //same row or col.
          console.log("rook can move");
          return true;
        }
        else{
          return false
        }
       
        case "bQ":
          if ( inBetween(fromSquare,toSquare,board) ||isDiagonal(fromSquare,toSquare,board))  {
            //same row or col.
            console.log("queen can move");
            return true;
          }
          else{
            return false;
          }
        case "bN":
          if(isKnightMove(fromSquare,toSquare,board)){
            return true
          }  
          else{
            return false
          }
      // Add more cases for other black pieces as needed
      default:
        return false;
    }
  } 
  else if (draggedPiece[0] === "w" && board[getSquareIndex(toSquare)].piece[0]!=="w") {
    switch (pieceType) {
      case "wP": // Black Pawn
        // Implement logic for black pawn movement
        if (fromSquare[0] === toSquare[0] && fromSquare[1] < toSquare[1]) {
          // console.log("piece type is", pieceType);
          // console.log('piece on desstination is ',board[getSquareIndex(toSquare)].piece)
          return true;
        } else {
          return false;
        }
      case "wB":
        if(isDiagonal(fromSquare,toSquare,board)){
          return true
        }
        else{
          return false
        }

      case "wR":
        if (inBetween(fromSquare,toSquare,board) && (fromSquare[0] === toSquare[0] || fromSquare[1] === toSquare[1] )
          ){
          //same row or col.
          console.log("rook can move");
          return true;
        }
        else{
          return false
        }
       
        case "wQ":
          if ( inBetween(fromSquare,toSquare,board) ||isDiagonal(fromSquare,toSquare,board))  {
            //same row or col.
            console.log("queen can move");
            return true;
          }
          else{
            return false;
          }
        case "wN":
          if(isKnightMove(fromSquare,toSquare,board)){
            return true
          }  
          else{
            return false
          }
      // Add more cases for other black pieces as needed
      default:
        return false;
    }
  }

  return false; // Return true if the move is valid
};
