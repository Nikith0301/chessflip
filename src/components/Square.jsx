import React from "react";
import Piece from "./Piece";

export default function Square({ position, src, onDragStart, onDrop }) {
  function getSquareColor(position) {
    const column = position.charAt(0).toLowerCase(); 
    const row = parseInt(position.charAt(1), 10); 

    const columnNumber = column.charCodeAt(0) - "a".charCodeAt(0) + 1;

    return (columnNumber + row) % 2 === 0 ? "black" : "white";
  }

  return (
    <div
      className={getSquareColor(position) === "black" ? "w-12 h-12 bg-blackbox" : "w-12 h-12 bg-whitebox"}
      id={position}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      draggable={src !== ''} // Only allow dragging if there's a piece
      onDragStart={onDragStart}
    >
      {src && <Piece src={src} />} {/* Render piece if it exists */}
    </div>
  );
}
