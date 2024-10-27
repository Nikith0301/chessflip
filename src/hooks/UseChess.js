const players = {}; // Store players and their assigned colors

io.on("connection", (socket) => {
    socket.join("chess-room");
    console.log('A player connected:', socket.id);

    // Assign color based on availability
    const rooms = io.sockets.adapter.rooms.get("chess-room");
    if (rooms.size === 1) {
        players[socket.id] = 'white';
    } else if (rooms.size === 2) {
        players[socket.id] = 'black';
    } else {
        console.log("Room full, cannot add more players.");
        socket.disconnect();
        return;
    }
    socket.emit('assignColor', players[socket.id]); // Send color assignment to client

    // Listen for move events
    socket.on('move', (data) => {
        const playerColor = players[socket.id];
        
        // Validate if player is moving their assigned color
        if (playerColor === data.color) {
            console.log(`Move from ${playerColor}:`, data);
            socket.to("chess-room").emit('move', data);
        } else {
            console.log("Invalid move attempt by player with color:", playerColor);
        }
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
        delete players[socket.id]; // Remove player on disconnect
    });
});
