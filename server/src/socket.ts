const SOCKET_USER_CONNECTED_EVENT_NAME = "user-connected";
const SOCKET_USER_CONNECTED_ROOM_EVENT_NAME = "user-connected-room";
const SOCKET_JOIN_ROOM_EVENT_NAME = "join-room";
const SOCKET_LEAVE_ROOM_EVENT_NAME = "leave-room";
const SOCKET_MESSAGE_EVENT_NAME = "message";

interface Room {
  name: string;
  users: number;
}

const MAX_USERS = 5;

export function setupSocket(io: any) {
  const rooms: Room[] = [];
  let numberOfUsersConnected = 0;

  io.on("connection", (socket: any) => {
    if (numberOfUsersConnected >= MAX_USERS) {
      console.log(
        "User connection rejected: maximum number of users reached. MAX_USERS = " +
          MAX_USERS
      );
      socket.disconnect();
      return;
    }

    console.log("A user connected");
    numberOfUsersConnected++;

    io.emit(SOCKET_USER_CONNECTED_EVENT_NAME, numberOfUsersConnected);

    socket.on(SOCKET_JOIN_ROOM_EVENT_NAME, (roomName: string) => {
      let room = rooms.find((r) => r.name === roomName);
      if (!room) {
        room = { name: roomName, users: 0 };
        rooms.push(room);
      }
      room.users++;
      socket.join(roomName);
      io.to(roomName).emit(SOCKET_USER_CONNECTED_ROOM_EVENT_NAME, room.users);
    });

    socket.on(SOCKET_LEAVE_ROOM_EVENT_NAME, (roomName: string) => {
      let room = rooms.find((r) => r.name === roomName);
      if (room) {
        room.users--;
        io.to(roomName).emit(SOCKET_USER_CONNECTED_ROOM_EVENT_NAME, room.users);
      }
    });

    socket.on(
      SOCKET_MESSAGE_EVENT_NAME,
      ({ room, message }: { room: string; message: string }) => {
        io.to(room).emit(SOCKET_MESSAGE_EVENT_NAME, message);
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      numberOfUsersConnected--;
      io.emit(SOCKET_USER_CONNECTED_EVENT_NAME, numberOfUsersConnected);

      rooms.forEach((room) => {
        if (socket.rooms.has(room.name)) {
          room.users--;
          if (room.users === 0) {
            rooms.splice(rooms.indexOf(room), 1);
          } else {
            io.to(room.name).emit(
              SOCKET_USER_CONNECTED_ROOM_EVENT_NAME,
              room.users
            );
          }
        }
      });
    });
  });
}
