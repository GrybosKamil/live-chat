import { useEffect, useState } from "react";
import { socket } from "./socket";
import "./Chat.css";

const SOCKET_MESSAGE_EVENT_NAME = "message";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    socket.on(SOCKET_MESSAGE_EVENT_NAME, (message: string) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off(SOCKET_MESSAGE_EVENT_NAME);
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit(SOCKET_MESSAGE_EVENT_NAME, input);
      setInput("");
    }
  };

  return (
    <div className="chat">
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
