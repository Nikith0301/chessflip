import { create } from 'zustand';
import chesspieces from '../assets/chesspieces';
// Define the initial board setup
const rows = [1, 2, 3, 4, 5, 6, 7, 8];
const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let boardObj = [];
for (let r = 7; r >= 0; r--) {
  for (let c = 0; c < 8; c++) {
    if (r === 6) {
      boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: chesspieces.bP });
    } else if (r === 1) {
      boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: chesspieces.wP });
    } else {
      boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: '' });
    }
  }
}

// Create the Zustand store
const useChessStore = create((set) => ({
  board: boardObj,
  movePiece: (moveFrom, moveTo) => set((state) => {
    const newBoard = state.board.map((square) => {
      if (square.coordinate === moveFrom) {
        return { ...square, piece: '' }; // Clear the piece from the original location
      } else if (square.coordinate === moveTo) {
        const piece = state.board.find((s) => s.coordinate === moveFrom).piece;
        return { ...square, piece }; // Place the piece in the new location
      }
      return square; // Return the square unchanged
    });
    return { board: newBoard };
  }),
}));

export default useChessStore;
