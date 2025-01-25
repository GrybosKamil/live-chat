import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { socket } from "./components/socket";

const SOCKET_USER_CONNECTED_EVENT_NAME = "user-connected";

export default function App() {
  const [usersConnected, setUsersConnected] = useState<number>(0);

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

  return (
    <div id="App">
      <h1>Live Chat</h1>
      <h2>Users: {usersConnected}</h2>
      <Chat />
    </div>
  );
}
