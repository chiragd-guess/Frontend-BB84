import MessageComposer from "../MessageComposer/MessageComposer";
import ChatWindow from "../ChatWindow/ChatWindow";

export default function AlicePanel({ simulation, setSimulation }) {
  return (
    <section className="alice-panel">

      <p>Alice — [Status: Online]</p>

      <ChatWindow
        title="Alice Chat"
        messages={simulation.messages}
        emptyText="No messages yet"
      />

      <MessageComposer
        simulation={simulation}
        setSimulation={setSimulation}
      />

    </section>
  );
}