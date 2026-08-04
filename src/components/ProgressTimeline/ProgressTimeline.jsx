const steps = [
  {
    id: 1,
    title: "Preparing Photons",
    description: "Generating qubits" ,
  },
  {
    id: 2,
    title: "Sending Photons",
    description: "Quantum channel",
  },
  {
    id: 3,
    title: "Receiver Measuring",
    description: "Bob measures",
  },
  {
    id: 4,
    title: "Basis Comparison",
    description: "Compare bases",
  },
  {
    id: 5,
    title: "QBER Estimation",
    description: "Security check",
  },
  {
    id: 6,
    title: "Shared Key Generation",
    description: "Security key",
  },
  {
    id: 7,
    title: "Message Encryption",
    description: "Encrypting",
  },
  {
    id: 8,
    title: "Ciphertext Transmission",
    description: "Secure delivery",
  },
];

export default function ProgressTimeline({
  currentStage = 0,
  failed = false
}) {
  const totalSteps = steps.length;
  const stageOffset = currentStage > 0
    ? Math.min(100, Math.max(0, ((currentStage - 1) / (totalSteps - 1)) * 100))
    : 0;

  return (
    <div className="stage-bar">
      <div className="stage-head">
        <div className="stage-title">Protocol Timeline</div>
        <div className="stage-stats">
          <div className="link-meta">
            <div className="k">Stage</div>
            <div className="v">{currentStage}/{totalSteps}</div>
          </div>
        </div>
      </div>

      <div className="stage-track-row">
        <div className="link-avatar alice">A</div>

        <div className="stage-track-wrap">
          <div className="stage-line" />
          <div className={`photon ${failed ? "alert" : ""}`} style={{ left: `${stageOffset}%` }} />
          <div className="stage-track">
            {steps.map((step) => {
              const completed = step.id < currentStage;
              const active = step.id === currentStage;
              const alert = failed && step.id >= 5;
              const statusClass = completed
                ? "done"
                : active
                ? "active"
                : alert
                ? "alert"
                : "";

              return (
                <div key={step.id} className={`stage-step ${statusClass}`}>
                  <div className="node" />
                  <div className="label">{step.title}</div>
                  <div className="sub">{step.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="link-avatar bob">B</div>
      </div>
    </div>
  );
}
