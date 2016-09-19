// SERVER SIDE
module.exports = function(app, server, io) {
	app.get('/', function(req, res) {
		res.render("index");
	})

	var users = {};

	io.sockets.on('connection', function(socket) {
	  //all our sockety things
	  console.log('woo sockets!');

	  console.log(socket.id, 'woo sockets!')
	  //listening for

	  socket.on('new_user', function(username) { //from client side
			users[socket.id] = username;
			// console.log(username + ' printing username');
	    console.log('we got a new user!', username);
	    socket.broadcast.emit("new_user_joined", username);//username from dict
	    socket.emit('welcome_new_user', users[socket.id]);
			// users[socket.id] = username;
			console.log(users);
	  })

	  socket.on('new_message', function(message) { //message being sent from client side
	    console.log('this is my message: ', message);
	    io.emit('bounce_back_new_message', message);

	  })

	  socket.on('disconnect', function() {
	    console.log(socket.id, 'disconnect');
	    io.emit('user_disconnected', socket.id)
	    console.log('users array ', users);
	    for (var i = 0; i < users.length; i ++) {
	      if (users[i] === socket.id ) {
	        users.splice(i);
	      }
	      console.log(users, i, 'Alex was here');
	    }

	  })

	})


}
