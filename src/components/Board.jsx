import React from 'react';
// import Piece from './Piece';
import chesspieces from '../assets/chesspieces.jsx';

import Square from './Square.jsx';
import useChessStore from '../store/content.js';

export default function Board() {
  const { board, movePiece } = useChessStore();

  let draggedPiece = null;


 
  

  const handleDragStart = (piece) => {
    draggedPiece = piece; // Store the piece being dragged
    console.log('piece is',piece)
  };



  const handleDrop = (moveTo) => {
    // console.log('piece on dest square is',board[getSquareIndex(moveTo)])
    if (draggedPiece) {
      

      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged
      movePiece(moveFrom, moveTo,draggedPiece.piece); // Move the piece in the store
      draggedPiece = null; // Reset dragged piece after the move
      // console.log(moveFrom)
      // console.log(moveTo)
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='grid grid-cols-8 grid-rows-8'>
        {board.map((o) => (
          <Square 
            key={o.coordinate} 
            position={o.coordinate} 
            src={chesspieces[o.piece]}//o.piece gives 'bP' -->chesspieces.bP gives svg of balck pawn 
            onDragStart={() => handleDragStart(o)} 
            onDrop={() => handleDrop(o.coordinate)}
          />
        ))}
      </div>
    </div>
  );
}
