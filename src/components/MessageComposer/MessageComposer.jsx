import { runSimulation } from "../../services/simulationService";

const MAX_LENGTH = 500;

export default function MessageComposer({
  simulation,
  setSimulation,
  user = "Alice",
}) {
  const keyEstablished = simulation.status === "completed";
  const isRunning = simulation.status === "running";
  const isAborted = simulation.status === "aborted";
  const currentUser = user.toLowerCase();

  const handleChange = (e) => {
    setSimulation({
      ...simulation,
      initiator: user,
      [currentUser]: {
        ...simulation[currentUser],
        message: e.target.value,
      },
    });
  };

  const handleSend = () => {
    const message = simulation[currentUser].message;
    if (!message.trim()) return;

    if (keyEstablished) {
      setSimulation((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: user,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: message,
          },
        ],
        [currentUser]: {
          ...prev[currentUser],
          message: "",
        },
      }));
      return;
    }

    runSimulation(setSimulation, message, user);
  };

  return (
    <div className="message-composer">
      <label>
        {isAborted
          ? "Message Blocked"
          : keyEstablished
          ? `Message ${user === "Alice" ? "Bob" : "Alice"}`
          : "Start Secure Conversation"}
      </label>
      <textarea
        placeholder={
          isAborted
            ? "Eve detected. Disable Eve and retry."
            : "Type a message to initiate BB84 key exchange..."
        }
        rows={4}
        maxLength={MAX_LENGTH}
        value={simulation[currentUser].message}
        onChange={handleChange}
        disabled={isRunning || isAborted}
      />
      <p>
        {simulation[currentUser].message.length}
        {" / "}
        {MAX_LENGTH}
      </p>
      <button
        onClick={handleSend}
        disabled={
          !simulation[currentUser].message.trim() ||
          isRunning ||
          isAborted
        }
      >
        {isRunning
          ? "Transmitting..."
          : isAborted
          ? "Blocked"
          : "Send Message"}
      </button>
    </div>
  );
}