import MessageComposer from "../MessageComposer/MessageComposer";
import ChatWindow from "../ChatWindow/ChatWindow";

export default function AlicePanel({ simulation, setSimulation }) {
  return (
    <section className="alice-panel">

      <div className="chat-header">

        <div className="chat-user">

          <div className="chat-avatar">
            👩
          </div>

          <div className="chat-user-info">

            <h3>Alice</h3>

            <div className="chat-status">
              <span className="chat-status-dot"></span>
              Online 
            </div>

          </div>

        </div>

        <div className="chat-security">
           BB84 Secured
        </div>

      </div>

      <ChatWindow
        title=""
        messages={simulation.messages}
        emptyText="Waiting for secure quantum message..."
      />

      <MessageComposer
        simulation={simulation}
        setSimulation={setSimulation}
      />

    </section>
  );
}