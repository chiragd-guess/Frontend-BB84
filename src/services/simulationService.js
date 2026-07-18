const STAGE_NAMES = [
  "Preparing Photons",
  "Sending Photons",
  "Receiver Measuring",
  "Basis Comparison",
  "QBER Estimation",
  "Shared Key Generation",
  "Message Encryption",
  "Ciphertext Transmission",
];
const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 1800;
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
    text: `⚠ BB84 Protocol Aborted — Eve detected (QBER: ${qber}%). Shared key discarded. Message was NOT transmitted.`,
  };
}

/**
 * Unified BB84 simulation engine.
 *
 * @param {Function} setSimulation  - React state setter
 * @param {string}   [messageText]  - optional: the message being sent (Alice/Bob flow)
 * @param {string}   [sender]       - optional: "alice" | "bob" (Alice/Bob flow)
 *
 * Called from Dashboard (no message):   runSimulation(setSimulation)
 * Called from Alice/Bob send:           runSimulation(setSimulation, text, "alice")
 */
export function runSimulation(setSimulation, messageText = null, sender = null) {
  let stage = 1;
  let aborted = false;

  setSimulation((prev) => ({
    ...prev,
    status: "running",
    protocol: { stage: 0, current: "" },
  }));

  const interval = setInterval(() => {
    if (aborted) return;

    setSimulation((prev) => ({
      ...prev,
      protocol: {
        stage,
        current: STAGE_NAMES[stage - 1],
      },
    }));

    if (stage === 5) {
      setTimeout(() => {
        setSimulation((prev) => {
          const qber = prev.channel.eve
            ? 25.0
            : parseFloat((Math.random() * 3 + 1).toFixed(2));

          if (qber > ABORT_THRESHOLD) {
            aborted = true;
            clearInterval(interval);

            return {
              ...prev,
              status: "aborted",
              protocol: { stage: 5, current: STAGE_NAMES[4] },
              analytics: {
                qber,
                photonsSent: 512,
                keyLength: 0,
              },
              session: {
                ...prev.session,
                secure: false,
              },
              messages: [
                ...prev.messages,
                createAbortMessage(qber),
              ],
            };
          }

          return prev;
        });
      }, 100);
    }

    stage++;

    if (stage > TOTAL_STAGES) {
      clearInterval(interval);

      setSimulation((prev) => {
        if (prev.status === "aborted") return prev;

        const qber = parseFloat((Math.random() * 3 + 1).toFixed(2));

        // Base completed state (Dashboard "Run Simulation" flow)
        const completed = {
          ...prev,
          status: "completed",
          protocol: { stage: TOTAL_STAGES, current: STAGE_NAMES[TOTAL_STAGES - 1] },
          analytics: {
            qber,
            photonsSent: 512,
            keyLength: 256,
          },
          session: {
            id: `QKD-${Date.now().toString().slice(-4)}`,
            secure: true,
            duration: "1.3 s",
          },
        };

        // Extra state only needed when a real message is being sent
        if (messageText && sender) {
          return {
            ...completed,
            bob: {
              ...prev.bob,
              encryptedMessage: "110010101011001010101001",
              decryptedMessage: messageText,
            },
            messages: [
              ...prev.messages,
              {
                id: Date.now(),
                sender,
                time: timestamp(),
                text: messageText,
              },
            ],
          };
        }

        return completed;
      });
    }
  }, STAGE_DELAY_MS);
}