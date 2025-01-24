const SOCKET_MESSAGE_EVENT_NAME = "message";

export function setupSocket(io: any) {
  io.on("connection", (socket: any) => {
    console.log("A user connected");

    socket.on(SOCKET_MESSAGE_EVENT_NAME, (message: string) => {
      console.log("Message received: " + message);
      io.emit(SOCKET_MESSAGE_EVENT_NAME, message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
