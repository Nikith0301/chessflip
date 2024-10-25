import chesspieces from "../assets/chesspieces.jsx";
import useChessStore from "../store/content.js";

// Custom hook
function UseChess() {
//   const { board, movePiece } = useChessStore();

  function getSquareIndex(square) {
    console.log('req recieved')
    const cols = "abcdefgh";
    const rows = "87654321";

    const col = square[0];
    const row = square[1];

    const colIndex = cols.indexOf(col);
    const rowIndex = rows.indexOf(row);

    return rowIndex * 8 + colIndex;
  }

  return   {getSquareIndex} ;
}

export default UseChess;
