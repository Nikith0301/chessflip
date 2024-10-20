// Piece.js
import React from 'react';

const Piece = ({ src }) => {

    function handleDragStart(){
        console.log('piece drag started')
    }

  return (
    <div onDragStart={handleDragStart}
    
    draggable='true' >
      {src}  {/* This will render the passed SVG */}
    </div>
  );
};

export default Piece;
