import ChatWindow from "../ChatWindow/ChatWindow";

const bobMessages = [
  { id: 1, sender: "Alice", time: "--:--", text: "Placeholder received message" },
];

export default function BobPanel() {
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
          <button>[Reply 1]</button>
          <button>[Reply 2]</button>
          <button>[Reply 3]</button>
        </div>
        <input placeholder="Type your reply..." />
      </div>
    </section>
  );
}