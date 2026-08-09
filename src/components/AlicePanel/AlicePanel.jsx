import MessageComposer from "../MessageComposer/MessageComposer";

export default function AlicePanel({ simulation, setSimulation }) {
  return (
    <section className="alice-panel">

      <div className="chat-header">

        <div className="chat-user">

          <div className="chat-avatar chat-avatar--alice">
            A
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

      <MessageComposer
        simulation={simulation}
        setSimulation={setSimulation}
      />

    </section>
  );
}