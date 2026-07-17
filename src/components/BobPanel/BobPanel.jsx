import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";

const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 600;
const ABORT_THRESHOLD = 11;

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createAbortMessage(qber) {
  return {
    id: Date.now(),
    sender: "system",
    time: timestamp(),
    text: `⚠ BB84 Protocol Aborted — Eve detected (QBER: ${qber}%). Shared key discarded. Message was NOT transmitted. Disable Eve and retry.`,
  };
}

function runBB84(setSimulation, messageText) {
  let stage = 1;
  let aborted = false;

  const interval = setInterval(() => {
    if (aborted) return;

    setSimulation((s) => ({ ...s, protocol: { stage } }));

    if (stage === 5) {
      setTimeout(() => {
        setSimulation((s) => {
          const qber = s.channel.eve
            ? 25.0
            : parseFloat((Math.random() * 3 + 1).toFixed(2));

          if (qber > ABORT_THRESHOLD) {
            aborted = true;
            clearInterval(interval);
            return {
              ...s,
              status: "aborted",
              protocol: { stage: 5 },
              analytics: { qber, photonsSent: 512, keyLength: 0 },
              session: { ...s.session, secure: false },
              messages: [...s.messages, createAbortMessage(qber)],
              bob_composer: "",
            };
          }
          return s;
        });
      }, 100);
    }

    stage++;

    if (stage > TOTAL_STAGES) {
      clearInterval(interval);
      setSimulation((s) => {
        if (s.status === "aborted") return s;
        const qber = parseFloat((Math.random() * 3 + 1).toFixed(2));
        return {
          ...s,
          status: "completed",
          protocol: { stage: TOTAL_STAGES },
          bob: {
            ...s.bob,
            encryptedMessage: "110010101011001010101001",
            decryptedMessage: messageText,
          },
          analytics: { qber, photonsSent: 512, keyLength: 256 },
          session: {
            id: `QKD-${Date.now().toString().slice(-4)}`,
            secure: true,
            duration: "1.3 s",
          },
          messages: [
            ...s.messages,
            {
              id: Date.now(),
              sender: "Bob",
              time: timestamp(),
              text: messageText,
            },
          ],
          bob_composer: "",
        };
      });
    }
  }, STAGE_DELAY_MS);
}

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

    if (!keyEstablished) {
      setSimulation((prev) => ({
        ...prev,
        status: "running",
        protocol: { stage: 0 },
        initiator: "Bob",
        bob_composer: reply,
      }));
      runBB84(setSimulation, reply);
    } else {
      setSimulation((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: "Bob",
            time: timestamp(),
            text: reply,
          },
        ],
        bob_composer: "",
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="bob-panel">
      <p>Bob (Receiver) — [Status: Online]</p>

      <ChatWindow
        title="Bob Chat"
        messages={simulation.messages}
        emptyText="Start a secure conversation..."
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