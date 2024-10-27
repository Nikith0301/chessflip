// client.js
import { io } from 'socket.io-client';




const socket = io('http://localhost:3000');
let assignedColor;

// Create a function to hold respData with `oppMove` state and `setOppMove` updater
export const respData = {
    oppMove: null,
    setOppMove: () => {}, // Placeholder; will be initialized by Board component
};

export const colorFun = {
    clientColor: null,
    setColor: () => {}, // Placeholder; will be initialized by Board component
};
export const turnFun={
    clientTurn:null,
    setTurn:()=>{}
}

socket.on('assignColor',(color,id)=>{
    assignedColor=color
    colorFun.setColor(assignedColor)
    console.log('Assigned color:', assignedColor,id);

})

socket.on("turnchange",(turn)=>{
    console.log("Received turn from server:",turn)
    turnFun.setTurn(turn)})// tell opponent to change move --> flip whiteTurn on opp.side

// Listen for moves from the server
socket.on('move', (moveData) => {
    // console.log('Move received from server:', moveData);

    // if(assignedColor===playerColor)
    if (respData.setOppMove) {
        respData.setOppMove(moveData); // Update `oppMove` state on new move
    }


});




// Send a move (when the player makes a move on the frontend)
export function clientmakeMove(moveData,turn) {
    console.log(moveData,socket.id,"->",assignedColor)
    if(moveData.draggedPiece[0]==='w'){
        moveData['color']='white'
    }
    if(moveData.draggedPiece[0]==='b'){
        moveData['color']='black'
    }
   
    socket.emit('move', moveData,turn);//* sends the moveData to the server where the socket.on('move', ...) event listener is defined. 
}
