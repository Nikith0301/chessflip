import { useEffect, useState } from "react";
// import Piece from './Piece';
import chesspieces from "../assets/chesspieces.jsx";

import Square from "./Square.jsx";
import useChessStore from "../store/content.js";
import { respData ,colorFun,clientflipBoard} from "../client.js";
export default function Board() {
  const { board, movePiece, responseMove } = useChessStore();
  const [whiteTurn,setwhiteTurn]=useState("white");
  const[userBoard,setUserBoard]=useState(board)

  let draggedPiece = null;


  const [oppMove, setOppMove] = useState(null);
  const [clientColor, setColor] = useState(null);
  // const [clientTurn, setTurn] = useState(null);

  // (Initialize `respData.setOppMove` to sync state with server updates
  respData.setOppMove = setOppMove; //* Board assigns setOppMove to respData.setOppMove.
  // ?explanation link -->https://chatgpt.com/share/671dd68a-b860-8004-8ee5-027393f047e9

colorFun.setColor=setColor;

// console.log("board says the assigned coloris",clientColor)
// turnFun.setTurn=setTurn;

  // Track changes to `oppMove` and handle them
  useEffect(() => {
    if (oppMove) {
      console.log("Opponent’s move detected:", oppMove);
      // Handle updating the board with opponent's move here
      UpdateMove(oppMove);
      // setwhiteTurn(!whiteTurn)
      console.log(whiteTurn)
    }
  }, [oppMove]);

useEffect(() => {

  // if(clientColor=="black"){
   // let tempBoard=board.reverse()//! this overwrites org array
   let tempBoard = board.slice().reverse();
  // }
  console.log(board)
 setUserBoard(tempBoard)

}, [board]);


const handleFlipButtonClick = () => {
  clientflipBoard();
};
  //! This is causing some error i think regading turn state)Update board function
  function UpdateMove(moveData) {
    console.log("Updating board with opponent move:", moveData);

   
    responseMove(moveData.moveFrom, moveData.moveTo, moveData.draggedPiece);
    let c=moveData.color;
    if(c =="white"){setwhiteTurn("black")}
    else{setwhiteTurn("white")}
    console.log(whiteTurn)
    // You can use `movePiece` or another function to apply `moveData`
  }
  const handleDragStart = (piece) => {
    draggedPiece = piece; // Store the piece being dragged
    console.log("piece is", piece);
  };


  const handleDrop = (moveTo) => {
    // console.log('piece on dest square is',board[getSquareIndex(moveTo)])
    console.log("board ka color",draggedPiece.piece[0])

    if (draggedPiece &&draggedPiece.piece[0]==='w' &&  whiteTurn=="white"  && clientColor=="white") {
      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged

      const isMoveExecuted  = movePiece(moveFrom, moveTo, draggedPiece.piece); 
console.log("was move executed",isMoveExecuted)
      // If the move wasn't executed, exit early
      if (!isMoveExecuted) return;
      {isMoveExecuted && whiteTurn ==="white"?setwhiteTurn("black"):setwhiteTurn("white")}

      draggedPiece = null; // Reset dragged piece after the move
    
    }
    else if (draggedPiece &&draggedPiece.piece[0]==='b' &&  whiteTurn=="black"  && clientColor=="black") {
      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged

      const isMoveExecuted  = movePiece(moveFrom, moveTo, draggedPiece.piece); 
      console.log("was move executed",isMoveExecuted)
      // If the move wasn't executed, exit early
      if (!isMoveExecuted) return;
      {isMoveExecuted && whiteTurn ==="white"?setwhiteTurn("black"):setwhiteTurn("white")}
      draggedPiece = null; // Reset dragged piece after the move
      
    }


  };

  return (
    <>
    <h1>mycolor is {clientColor}</h1>
    <button onClick={handleFlipButtonClick}>Change color</button>

     {whiteTurn=="white"?<h1 className="text-lime-500 text-lg">WHites turn</h1>:<h1 className="text-lime-500 text-lg">Blacks turn</h1>}
     {whiteTurn=="black"?<h1 className="text-lime-500 text-lg">black kaa turn</h1>:<h1 className="text-lime-500 text-lg">Blacks turn</h1>}
     {/* {clientTurn?<h1 className="text-lime-500 text-lg">WHites turn</h1>:<h1 className="text-lime-500 text-lg">Blacks turn</h1>} */}



       <div className="w-screen h-screen flex justify-center items-center">
     
       <div className="grid grid-cols-8 grid-rows-8">
         {clientColor=="white" &&  board.map((o) => (
           <Square

             key={o.coordinate}
             position={o.coordinate}
             src={chesspieces[o.piece]} //o.piece gives 'bP' -->chesspieces.bP gives svg of balck pawn
             onDragStart={() => handleDragStart(o)}
             onDrop={() => handleDrop(o.coordinate)}
           />
         ))}
       

       {clientColor=="black" && userBoard.map((o) => (
           <Square

             key={o.coordinate}
             position={o.coordinate}
             src={chesspieces[o.piece]} //o.piece gives 'bP' -->chesspieces.bP gives svg of balck pawn
             onDragStart={() => handleDragStart(o)}
             onDrop={() => handleDrop(o.coordinate)}
           />
         ))}
       </div>

      
     </div>
     
  </>
  );
}



