import { useState } from "react";

const MAX_LENGTH = 500;

export default function MessageComposer() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send placeholder:", message);
    setMessage("");
  };

  return (
    <div className="message-composer">
      <label htmlFor="message-input">Compose Message</label>
      <textarea
        id="message-input"
        placeholder="Type your message..."
        rows={4}
        maxLength={MAX_LENGTH}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <p>{message.length} / {MAX_LENGTH}</p>
      <button onClick={handleSend} disabled={!message.trim()}>
        Send Message
      </button>
    </div>
  );
}