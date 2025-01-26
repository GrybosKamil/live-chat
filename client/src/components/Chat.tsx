import { useEffect, useState } from "react";
import { socket } from "../socket";
import "./Chat.css";

const SOCKET_MESSAGE_EVENT_NAME = "message";
const SOCKET_JOIN_ROOM_EVENT_NAME = "join-room";

interface ChatProps {
  room: string;
  leaveRoom: () => void;
}

export default function Chat({ room, leaveRoom }: ChatProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (room) {
      socket.emit(SOCKET_JOIN_ROOM_EVENT_NAME, room);
    }

    socket.on(SOCKET_MESSAGE_EVENT_NAME, (message: string) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off(SOCKET_MESSAGE_EVENT_NAME);
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
