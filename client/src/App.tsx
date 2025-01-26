import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { socket } from "./socket";

const SOCKET_USER_CONNECTED_EVENT_NAME = "user-connected";

export default function App() {
  const [usersConnected, setUsersConnected] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    socket.on(
      SOCKET_USER_CONNECTED_EVENT_NAME,
      (usersConnectedNumber: number) => {
        setUsersConnected(usersConnectedNumber);
      },
    );

    return () => {
      socket.off(SOCKET_USER_CONNECTED_EVENT_NAME);
    };
  }, []);

  function leaveRoom() {
    setRoom("");
  }

  return (
    <div id="App">
      <h1>Live Chat</h1>
      <h2>Users: {usersConnected}</h2>

      <div className="join-room-form">
        <input
          type="text"
          value={name}
          placeholder="Enter room name"
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && setRoom(name)}
        />
        <button onClick={() => setRoom(name)}>Join room</button>
      </div>

      {room ? <Chat room={room} leaveRoom={leaveRoom} /> : null}
    </div>
  );
}
