const session = {};

function asignUser(socketId, name) {
  session[socketId] = name;
}

function getUser(socketId) {
  return session[socketId];
}

function removeSocketId(socketId) {
  delete session[socketId];
}

module.exports = {
  asignUser,
  getUser,
  removeSocketId,
};
