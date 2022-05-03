import React, { useState } from "react";

export function ChatApplication({ messages, onNewMessage }) {
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }
  return (
    <>
      <header>Kristiania Chat</header>
      <main>
        {messages.map(({ message, userInfo }, index) => (
          <div key={index}>
            <strong>{userInfo}:</strong> {message}
          </div>
        ))}
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}
