const http = require('http');
const socketio = require('socket.io');
const request = require('request-promise');

const env = require('./env');
const action = require('./action');
const session = require('./session');

const server = http.createServer();

const io = socketio(server);

io.on(action.CONNECTION, async function (socket) {
  const showtime_id = socket.handshake.query.showtime_id;

  const res = await request(env.API_ENDPOINT + '/showtimes/' + showtime_id, {
    json: true,
    simple: false,
  });

  if (res.error) {
    socket.disconnect();
    return;
  }

  socket.join(showtime_id);

  socket.once(action.ASIGN, function (name) {
    session.asignUser(socket.id, name);

    socket.on(action.MESSAGE, function (message) {
      const user = session.getUser(socket.id);
      if (user === undefined) return;

      io.to(showtime_id).emit(action.BROADCAST, { user, message });
    });
  });

  socket.on(action.DISCONNECT, function () {
    if (session.getUser(socket.id) !== undefined) {
      session.removeSocketId(socket.id);
    }
  });
});

server.listen(env.PORT, () => {
  console.log('socket server is listening on port ' + env.PORT);
});
