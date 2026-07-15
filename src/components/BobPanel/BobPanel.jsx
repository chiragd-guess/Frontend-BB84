import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";

const bobMessages = [
  { id: 1, sender: "Alice", time: "--:--", text: "Placeholder received message" },
];

const quickReplies = ["Hi Alice! I'm good.", "Hello Alice!", "Let's continue."];

export default function BobPanel() {
  const [reply, setReply] = useState("");

  return (
    <section className="bob-panel">
      <p>Bob (Receiver) — [Status: Online]</p>
      <ChatWindow title="Bob Chat" messages={bobMessages} />

      <div className="bob-panel__decrypted">
        <p>[Decrypted Message Placeholder]</p>
        <p>Status: [Successfully Decrypted Placeholder]</p>
      </div>

      <div className="bob-panel__quick-reply">
        <p>Quick Reply</p>
        <div className="bob-panel__reply-options">
          {quickReplies.map((text) => (
            <button key={text} onClick={() => setReply(text)}>
              {text}
            </button>
          ))}
        </div>
        <input
          placeholder="Type your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </div>
    </section>
  );
}