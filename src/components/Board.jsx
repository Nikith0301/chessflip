import { useEffect, useState } from "react";
// import Piece from './Piece';
import chesspieces from "../assets/chesspieces.jsx";

import Square from "./Square.jsx";
import useChessStore from "../store/content.js";
import { respData ,colorFun,turnFun} from "../client.js";
export default function Board() {
  const { board,whiteTurn, movePiece, responseMove,setWhiteTurn } = useChessStore();
  // const [whiteTurn,setwhiteTurn]=useState(true);

 
 

  let draggedPiece = null;

  const [oppMove, setOppMove] = useState(null);
  const [clientColor, setColor] = useState(null);
  // const [clientTurn, setTurn] = useState(null);

  // Initialize `respData.setOppMove` to sync state with server updates
  respData.setOppMove = setOppMove; //* Board assigns setOppMove to respData.setOppMove.
  // ?explanation link -->https://chatgpt.com/share/671dd68a-b860-8004-8ee5-027393f047e9

colorFun.setColor=setColor;
// turnFun.setTurn=setTurn;

  // Track changes to `oppMove` and handle them
  useEffect(() => {
    if (oppMove) {
      console.log("Opponent’s move detected:", oppMove);
      // Handle updating the board with opponent's move here
      UpdateMove(oppMove);
    }
  }, [oppMove]);

  useEffect(() => {
    turnFun.setTurn = setWhiteTurn; // This syncs `setWhiteTurn` with the server’s turn update
  }, []);


  // Update board function
  function UpdateMove(moveData) {
    console.log("Updating board with opponent move:", moveData);
    responseMove(moveData.moveFrom, moveData.moveTo, moveData.draggedPiece);
    // You can use `movePiece` or another function to apply `moveData`
  }

  const handleDragStart = (piece) => {
    draggedPiece = piece; // Store the piece being dragged
    console.log("piece is", piece);
  };

  const handleDrop = (moveTo) => {
    // console.log('piece on dest square is',board[getSquareIndex(moveTo)])
    console.log("board ka color",draggedPiece.piece[0])

    if (draggedPiece &&draggedPiece.piece[0]==='w' &&  whiteTurn && clientColor=="white") {
      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged

      movePiece(moveFrom, moveTo, draggedPiece.piece); // Move the piece in the store
      setWhiteTurn(!whiteTurn)
      // setTurn(!whiteTurn)

      draggedPiece = null; // Reset dragged piece after the move
    
    }
    else if (draggedPiece &&draggedPiece.piece[0]==='b' &&  !whiteTurn  && clientColor=="black") {
      const moveFrom = draggedPiece.coordinate; // Coordinate of the piece being dragged

      movePiece(moveFrom, moveTo, draggedPiece.piece); // Move the piece in the store
      setWhiteTurn(!whiteTurn)
      draggedPiece = null; // Reset dragged piece after the move
      
    }


  };

  return (
    <>
     {whiteTurn?<h1 className="text-lime-500 text-lg">WHites turn</h1>:<h1 className="text-lime-500 text-lg">Blacks turn</h1>}
     {/* {clientTurn?<h1 className="text-lime-500 text-lg">WHites turn</h1>:<h1 className="text-lime-500 text-lg">Blacks turn</h1>} */}

       <div className="w-screen h-screen flex justify-center items-center">
     
       <div className="grid grid-cols-8 grid-rows-8">
         {board.map((o) => (
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
