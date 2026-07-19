import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import { runSimulation } from "../../services/simulationService";

export default function BobPanel({ simulation, setSimulation }) {
  const [showTechnical, setShowTechnical] = useState(false);

  const reply = simulation.bob_composer || "";
  const keyEstablished = simulation.status === "completed";
  const isRunning = simulation.status === "running";
  const isAborted = simulation.status === "aborted";

  const handleChange = (e) => {
    setSimulation((prev) => ({ ...prev, bob_composer: e.target.value }));
  };

  const handleSend = () => {
    if (!reply.trim()) return;

    if (keyEstablished) {
      setSimulation((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: "Bob",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: reply,
          },
        ],
        bob_composer: "",
      }));
      return;
    }

    setSimulation((prev) => ({
      ...prev,
      initiator: "Bob",
      bob_composer: reply,
    }));

    runSimulation(setSimulation, reply, "Bob");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="bob-panel">
      <div className="chat-header">

<div className="chat-user">

  <div className="chat-avatar">
    👨
  </div>

  <div className="chat-user-info">

    <h3>Bob</h3>

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

      <div className="message-composer">
        <label htmlFor="bob-input">
          {isAborted
            ? "Message Blocked"
            : keyEstablished
            ? "Message Alice"
            : "Start Secure Conversation"}
        </label>
        <textarea
          id="bob-input"
          placeholder={
            isAborted
              ? "Eve interference detected. Disable Eve and retry."
              : keyEstablished
              ? "Type your message..."
              : "Type a message to initiate BB84 key exchange..."
          }
          rows={4}
          maxLength={500}
          value={reply}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isRunning || isAborted}
        />
        <p>{reply.length} / 500</p>
        <button
          onClick={handleSend}
          disabled={!reply.trim() || isRunning || isAborted}
        >
          {isRunning ? "Transmitting..." : isAborted ? "Blocked" : "Send Message"}
        </button>
      </div>

      {simulation.messages.length > 0 && (
        <div className="bob-panel__technical">
          <button
            className="bob-panel__technical-toggle"
            onClick={() => setShowTechnical((v) => !v)}
          >
            {showTechnical ? "▲ Hide Technical Details" : "▼ Show Technical Details"}
          </button>
          {showTechnical && (
            <div className="bob-panel__technical-content">
              <div className="bob-panel__technical-row">
                <span>Last Encrypted</span>
                <code>{simulation.bob.encryptedMessage || "N/A"}</code>
              </div>
              <div className="bob-panel__technical-row">
                <span>Last Message</span>
                <code>
                  {simulation.messages[simulation.messages.length - 1]?.text}
                </code>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}