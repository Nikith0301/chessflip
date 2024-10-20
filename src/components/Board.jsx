import React from 'react'
import Piece from './Piece'
import chesspieces from '../assets/chesspieces.jsx'
import Row from './Row.jsx';
import Square from './Square.jsx';
export default function Board() {

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  let boardObj = [];
  for (let r = 7; r >=0; r--) {
    for (let c = 0; c <8; c++) {
      if(r== 6){
        boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: chesspieces.bP });
      }
      else  if(r== 1){
        boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: chesspieces.wP });
      } 
      else{
        boardObj.push({ coordinate: `${cols[c]}${rows[r]}`, piece: '' });
      }
     
    }
  }
  

function handleDragOver(event){
  event.preventDefault();
}

function handleDrop(){
  console.log("piece dropped")
}
    
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className='flex flex-row justify-center items-center'>
{/* 
      <div
      onDragOver={(e)=>handleDragOver(e)} 
      onDrop={handleDrop}
      className="w-12 h-12" style={{ backgroundColor: 'rgb(240, 217, 181)' }}>
 
      </div>

      <div 
       onDragOver={(e)=>handleDragOver(e)} 
       onDrop={handleDrop}
      className="w-12 h-12 " style={{ backgroundColor: 'rgb(181, 136, 99)' }}>
      <Piece src={chesspieces.wP} />
      </div> */}

{/* {rows.map((n) => (
 
    <Row  rowNum={n} />


))} */}
{/* convert above to below */}


<div className='grid grid-cols-8 grid-rows-8'>
  {boardObj.map((o, index) => (
    <Square position={o.coordinate} src={o.piece}/>
  
  ))}
</div>


    



    </div>
  </div>
  
    
  )
}
