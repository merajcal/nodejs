let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let path = require('path');
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
let clients = 0;

io.on('connection', (socket) => {
	clients++;
	socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
	socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
	//socket.broadcast.emit('connected', {msg:'welcome to node chat'});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});


	socket.on('disconnect', function(){
		console.log('user disconnected');
		clients--;
		socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
	});
});

http.listen(3000, () =>{
	console.log("Server started at 3000");
});