const SOCKET_USER_CONNECTED_EVENT_NAME = "user-connected";
const SOCKET_MESSAGE_EVENT_NAME = "message";

export function setupSocket(io: any) {
  let numberOfUsersConnected = 0;

  io.on("connection", (socket: any) => {
    console.log("A user connected");
    numberOfUsersConnected++;

    io.emit(SOCKET_USER_CONNECTED_EVENT_NAME, numberOfUsersConnected);

    socket.on(SOCKET_MESSAGE_EVENT_NAME, (message: string) => {
      io.emit(SOCKET_MESSAGE_EVENT_NAME, message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      numberOfUsersConnected--;
      io.emit(SOCKET_USER_CONNECTED_EVENT_NAME, numberOfUsersConnected);
    });
  });
}
