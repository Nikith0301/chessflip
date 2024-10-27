import { create } from "zustand";
import chesspieces from "../assets/chesspieces";
import { fromJSON } from "postcss";
import { IsLegalMove } from "./chessLogic";
import { clientmakeMove } from "../client";
// Define the initial board setup
const rows = [1, 2, 3, 4, 5, 6, 7, 8];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

let boardObj = [];
for (let r = 7; r >= 0; r--) {
  for (let c = 0; c < 8; c++) {
    let piece = "";

    // Black pieces
    if (r === 7) {
      piece = ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"][c];//genius assigning using 2D array O.O 
    } else if (r === 6) {
      piece = "bP";
    }

    // White pieces
    else if (r === 0) {
      piece = ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"][c];
    } else if (r === 1) {
      piece = "wP";
    }
    else{
      piece=""
    }

    // Push each piece or an empty square
    boardObj.push({
      coordinate: `${cols[c]}${rows[r]}`,
      piece: piece,
      // image: piece ? chesspieces[piece] : null // Uncomment if using images
    });
  }
}


// Create the Zustand store
const useChessStore = create((set) => ({
  board: boardObj,
  whiteTurn:true,
  setWhiteTurn: (isWhiteTurn) => set({ whiteTurn: isWhiteTurn }),

  movePiece: (moveFrom, moveTo,draggedPiece) =>
    set((state) => {
      const newBoard = state.board.map((square) => {
        
        if (IsLegalMove(moveFrom, moveTo,draggedPiece,state.board)) {


          //*send MOve data to opponentso he can update as well
          const moveData={moveFrom:moveFrom,moveTo:moveTo,draggedPiece:draggedPiece}
          // const opp=
      clientmakeMove(moveData,!state.whiteTurn)
      
          //*

          if (square.coordinate === moveFrom) {
            return { ...square, piece: "" }; // Clear the piece from the original location
          } else if (square.coordinate === moveTo) {
            const piece = state.board.find(
              (s) => s.coordinate === moveFrom
            ).piece;
            return { ...square, piece }; // Place the piece in the new location
          }
        }

        return square; // Return the square unchanged
      });
      return { board: newBoard };
    }),
    responseMove: (moveFrom, moveTo,draggedPiece) => //!NO send MOve data to opponentso he can update as well
      set((state) => {
        const newBoard = state.board.map((square) => {
          
          if (IsLegalMove(moveFrom, moveTo,draggedPiece,state.board)) {
  
            if (square.coordinate === moveFrom) {
              return { ...square, piece: "" }; // Clear the piece from the original location
            } else if (square.coordinate === moveTo) {
              const piece = state.board.find(
                (s) => s.coordinate === moveFrom
              ).piece;
              return { ...square, piece }; // Place the piece in the new location
            }
          }
  
          return square; // Return the square unchanged
        });
        return { board: newBoard, whiteTurn: state.whiteTurn };
      }),
}));

export default useChessStore;
