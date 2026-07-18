export default function KeyExchangeVisualizer({
  currentStage = 0,
  simulation,
}) {
  const initiator = simulation?.initiator || "Alice";
  const eveDetected = simulation?.status === "aborted";
  const messageSending = currentStage >= 7;

  // Sender direction (qubits travel from sender → receiver)
  const quantumClass = initiator !== "Bob"
    ? "quantum--forward"
    : "quantum--backward";

  // Receiver direction (basis + encrypted message travel back receiver → sender)
  const receiverClass = initiator !== "Bob"
    ? "basis--backward"
    : "basis--forward";

  const messageClass = initiator !== "Bob"
    ? "message--backward"
    : "message--forward";

  const qubits = ["|0⟩", "|+⟩", "|1⟩"];

  return (
    <div className="key-exchange-visualizer">

      <div className="endpoint">
        👩
        <span>Alice</span>
      </div>

      <div className="photon-lane">

        {/* Stage 2: Sender → Receiver (qubits) */}
        {currentStage === 2 &&
          qubits.map((q, i) => (
            <div
              key={q}
              className={`quantum-state ${quantumClass}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {q}
            </div>
          ))}

        {/* Stage 4: Receiver → Sender (basis) */}
        {currentStage === 4 && (
          <div className={`basis-message ${receiverClass}`}>
            Z X X Z
          </div>
        )}

        {/* Stage 6: Shared key established (static) */}
        {currentStage === 6 && (
          <div className="shared-key">
            🔑 Shared Key Established
          </div>
        )}

        {/* Stage 7+: Receiver → Sender (encrypted message) */}
        {messageSending && (
          <div className={`message-photon ${messageClass}`}>
            🔒
          </div>
        )}

        {/* Eve warning */}
        {eveDetected && (
          <div className="eve-warning">
            ⚠ Eve detected
          </div>
        )}

      </div>

      <div className="endpoint">
        👨
        <span>Bob</span>
      </div>

    </div>
  );
}