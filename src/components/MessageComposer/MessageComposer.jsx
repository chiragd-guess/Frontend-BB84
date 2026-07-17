import { runSimulation } from "../../services/api";

const MAX_LENGTH = 500;
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

function runMockSimulation(setSimulation) {
  let stage = 1;
  const interval = setInterval(() => {
    setSimulation((s) => ({ ...s, protocol: { stage } }));

    if (stage === 5) {
      setTimeout(() => {
        setSimulation((s) => {
          const qber = s.channel.eve ? 25.0 : parseFloat((Math.random() * 3 + 1).toFixed(2));
          if (qber > ABORT_THRESHOLD) {
            clearInterval(interval);
            return {
              ...s,
              status: "aborted",
              protocol: { stage: 5 },
              analytics: { qber, photonsSent: 512, keyLength: 0 },
              session: { ...s.session, secure: false },
              messages: [...s.messages, createAbortMessage(qber)],
              alice: { ...s.alice, message: "" },
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
            encryptedMessage: "110010101011001010101001",
            decryptedMessage: s.alice.message,
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
              sender: "Alice",
              time: timestamp(),
              text: s.alice.message,
            },
          ],
          alice: { ...s.alice, message: "" },
        };
      });
    }
  }, STAGE_DELAY_MS);
}

export default function MessageComposer({ simulation, setSimulation }) {
  const keyEstablished = simulation.status === "completed";
  const isRunning = simulation.status === "running";
  const isAborted = simulation.status === "aborted";

  const handleChange = (e) => {
    setSimulation({
      ...simulation,
      alice: { ...simulation.alice, message: e.target.value },
    });
  };

  const handleSend = async () => {
    if (!simulation.alice.message.trim()) return;

    if (keyEstablished) {
      setSimulation((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: "Alice",
            time: timestamp(),
            text: prev.alice.message,
          },
        ],
        alice: { ...prev.alice, message: "" },
      }));
      return;
    }

    setSimulation((prev) => ({
      ...prev,
      status: "running",
      protocol: { stage: 0 },
    }));

    try {
      const result = await runSimulation({
        message: simulation.alice.message,
        noise: simulation.channel.noise,
        eve: simulation.channel.eve,
      });

      if (result.qber > ABORT_THRESHOLD) {
        setSimulation((prev) => ({
          ...prev,
          status: "aborted",
          protocol: { stage: 5 },
          analytics: { qber: result.qber, photonsSent: result.photons_sent, keyLength: 0 },
          session: { ...prev.session, secure: false },
          messages: [...prev.messages, createAbortMessage(result.qber)],
          alice: { ...prev.alice, message: "" },
        }));
        return;
      }

      setSimulation((prev) => ({
        ...prev,
        status: "completed",
        protocol: { stage: TOTAL_STAGES },
        bob: {
          encryptedMessage: result.encrypted_message,
          decryptedMessage: result.decrypted_message,
        },
        analytics: {
          qber: result.qber,
          photonsSent: result.photons_sent,
          keyLength: result.key_length,
        },
        session: {
          id: result.session_id,
          secure: result.secure,
          duration: result.duration,
        },
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: "Alice",
            time: timestamp(),
            text: prev.alice.message,
          },
        ],
        alice: { ...prev.alice, message: "" },
      }));
    } catch {
      console.warn("Backend unavailable — using mock simulation");
      runMockSimulation(setSimulation);
    }
  };

  return (
    <div className="message-composer">
      <label htmlFor="message-input">
        {isAborted
          ? "Message Blocked"
          : keyEstablished
          ? "Message Bob"
          : "Start Secure Conversation"}
      </label>
      <textarea
        id="message-input"
        placeholder={
          isAborted
            ? "Eve interference detected. Disable Eve and retry."
            : keyEstablished
            ? "Type your message..."
            : "Type a message to initiate BB84 key exchange..."
        }
        rows={4}
        maxLength={MAX_LENGTH}
        value={simulation.alice.message}
        onChange={handleChange}
        disabled={isRunning || isAborted}
      />
      <p>{simulation.alice.message.length} / {MAX_LENGTH}</p>
      <button
        onClick={handleSend}
        disabled={!simulation.alice.message.trim() || isRunning || isAborted}
      >
        {isRunning ? "Transmitting..." : isAborted ? "Blocked" : "Send Message"}
      </button>
    </div>
  );
}