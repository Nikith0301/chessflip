import React from 'react'
import Piece from './Piece';

export default function Square({position,src}) {
    // const[]=props;
   
// const position=col+rowNum;
    function getSquareColor(position) {
        const column = position.charAt(0).toLowerCase(); // Get the column (e.g., 'b')
        const row = parseInt(position.charAt(1), 10); // Get the row (e.g., '7')
      
        // Convert column letter to number (a=1, b=2, ..., h=8)
        const columnNumber = column.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      
        // Determine color based on the sum of column and row
        return (columnNumber + row) % 2 === 0 ? 'black' : 'white';
      }
      

 
      

  return (
    <>
      {getSquareColor(position) === "black" ? (
                <div className='w-12 h-12 bg-blackbox ' draggable='true' id={position} key={position}>
                    <Piece src={src} />
                </div>
            ) : (
                <div className='w-12 h-12 bg-whitebox' draggable='true' id={position} key={position}>
                    <Piece src={src} />
                </div>
            )}
    </>
  )
}
