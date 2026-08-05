const steps = [
  { id: 1, title: "Preparing Photons", description: "Generating qubits" },
  { id: 2, title: "Sending Photons", description: "Quantum channel" },
  { id: 3, title: "Receiver Measuring", description: "Bob measures" },
  { id: 4, title: "Basis Comparison", description: "Compare bases" },
  { id: 5, title: "QBER Estimation", description: "Security check" },
  { id: 6, title: "Shared Key Generation", description: "Security key" },
  { id: 7, title: "Message Encryption", description: "Encrypting" },
  { id: 8, title: "Ciphertext Transmission", description: "Secure delivery" },
];

export default function ProgressTimeline({ currentStage = 0, failed = false }) {
  return (
    <div className="stage-track">
      {steps.map((step) => {
        const completed = step.id < currentStage;
        const active = step.id === currentStage;
        const failedStep = failed && step.id >= 5;

        return (
          <div
            key={step.id}
            className={`stage-step ${completed ? "done" : ""} ${active ? "active" : ""} ${failedStep ? "alert" : ""}`}
          >
            <div className="node"></div>
            <div className="label">{step.title}</div>
            <div className="sub">
              {failedStep
                ? "Aborted"
                : completed
                ? "Completed"
                : active
                ? "Running"
                : step.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}