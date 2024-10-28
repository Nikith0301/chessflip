import { createServer } from "http";
import { Server } from "socket.io";

const httpsServer=createServer()

const io = new Server(httpsServer, {
    cors: {
        origin: 'http://localhost:5173',  // Allow requests from the frontend
        methods: ['GET', 'POST']
    }
});

let players={}

io.on("connection", (socket) => {
    socket.join("chess-room");
   
    const rooms = io.sockets.adapter.rooms.get("chess-room");
    console.log('A player connected:', socket.id ,"and room space now is",rooms.size);
    if (rooms.size === 1) {
        players[socket.id] = 'white';
        console.log(socket.id,"is",players[socket.id])
    } else if (rooms.size === 2) {
        players[socket.id] = 'black';
        console.log(socket.id,"is",players[socket.id])
    }  else {

        console.log("Room full, cannot add more players.");
        socket.disconnect();
        return;
    }
    console.log(players[socket.id])
    socket.emit("assignColor",players[socket.id],socket.id)//* Send color assignment to client
    socket.on('move', (data,turn) => {
        // Broadcast move to other player
       
        const playerColor=players[socket.id]

        if(playerColor===data.color){
            // console.log(`Move from ${playerColor}:`, data);
            socket.to("chess-room").emit('move', data);
            console
            socket.to("chess-room").emit('turnchange',turn);
        }
        else{
            console.log("invalid player is moving the piece// Worng color")
        }
        // socket.broadcast.emit('move', data);
       
        socket.on("disconnect", () => {
            console.log("Player disconnected:", socket.id);
            delete players[socket.id]; // Remove player on disconnect
        });

        
    });
});

httpsServer.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});