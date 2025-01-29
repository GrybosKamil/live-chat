import { useEffect, useState } from "react";
import { socket } from "../socket";
import "./Chat.css";

const SOCKET_MESSAGE_EVENT_NAME = "message";
const SOCKET_JOIN_ROOM_EVENT_NAME = "join-room";
const SOCKET_LEAVE_ROOM_EVENT_NAME = "leave-room";
const SOCKET_USER_CONNECTED_ROOM_EVENT_NAME = "user-connected-room";

interface ChatProps {
  room: string;
  leaveRoom: () => void;
}

export default function Chat({ room, leaveRoom }: ChatProps) {
  const [numberOfUsersConnectedToRoom, setNumberOfUsrsConnectedToRoom] =
    useState<number>(1);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (room) {
      socket.emit(SOCKET_JOIN_ROOM_EVENT_NAME, room);
    }

    socket.on(
      SOCKET_USER_CONNECTED_ROOM_EVENT_NAME,
      (numberOfUsers: number) => {
        setNumberOfUsrsConnectedToRoom(numberOfUsers);
      },
    );

    socket.on(SOCKET_MESSAGE_EVENT_NAME, (message: string) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    const handleUnload = () => {
      socket.emit(SOCKET_LEAVE_ROOM_EVENT_NAME, room);
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      socket.emit(SOCKET_LEAVE_ROOM_EVENT_NAME, room);
      
      socket.off(SOCKET_MESSAGE_EVENT_NAME);
      socket.off(SOCKET_USER_CONNECTED_ROOM_EVENT_NAME);

      window.removeEventListener("unload", handleUnload);
    };
  }, [room]);

  const sendMessage = () => {
    if (input) {
      socket.emit(SOCKET_MESSAGE_EVENT_NAME, { room, message: input });
      setInput("");
    }
  };

  return (
    <div className="chat">
      <div>Room name: {room}</div>
      <div>Number of users in room: {numberOfUsersConnectedToRoom}</div>

      <button onClick={() => leaveRoom()}>Leave room</button>

      <div className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="history">
        {messages.map((message, index) => (
          <div key={index + message} className="history-message">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
