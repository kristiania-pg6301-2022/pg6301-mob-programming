import { useEffect, useState } from "react";
import { ChatApplication } from "../components/ChatApplication";

const initialMessages = [];

export default function ChatPage({ user }) {
  const [userInfo, setUserInfo] = useState();
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState();
  const author = user.name;

  useEffect(() => {
    setUserInfo(author);
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      console.log("message", event);
      const { userInfo, message } = JSON.parse(event.data);
      setMessages((messages) => [...messages, { message, userInfo }]);
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    ws.send(JSON.stringify({ message, userInfo }));
  }

  return (
    <ChatApplication messages={messages} onNewMessage={handleNewMessage} />
  );
}
