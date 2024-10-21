import React from 'react';
// import Piece from './Piece';
// import chesspieces from '..chesspieces.jsx';
import Square from './Square.jsx';
import useChessStore from '../store/content.js';

export default function Board() {
  const { board, movePiece } = useChessStore();

  let draggedPiece = null;

  const handleDragStart = (piece) => {
    draggedPiece = piece; // Store the piece being dragged
  };

  const handleDrop = (moveTo) => {
    if (draggedPiece) {
      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged
      movePiece(moveFrom, moveTo); // Move the piece in the store
      draggedPiece = null; // Reset dragged piece after the move
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='grid grid-cols-8 grid-rows-8'>
        {board.map((o) => (
          <Square 
            key={o.coordinate} 
            position={o.coordinate} 
            src={o.piece} 
            onDragStart={() => handleDragStart(o)} 
            onDrop={() => handleDrop(o.coordinate)}
          />
        ))}
      </div>
    </div>
  );
}
