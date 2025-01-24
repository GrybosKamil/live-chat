import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

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
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((message, index) => (
          <div key={index + message}>{message}</div>
        ))}
      </div>
    </div>
  );
}
