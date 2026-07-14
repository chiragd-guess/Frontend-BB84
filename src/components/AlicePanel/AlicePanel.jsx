import MessageComposer from "../MessageComposer/MessageComposer";
import ChatWindow from "../ChatWindow/ChatWindow";

const aliceMessages = [
  { id: 1, sender: "You", time: "--:--", text: "Placeholder sent message" },
];

export default function AlicePanel() {
  return (
    <section className="alice-panel">
      <p>Alice (Sender) — [Status: Online]</p>
      <MessageComposer />
      <ChatWindow title="Alice Chat" messages={aliceMessages} />
    </section>
  );
}