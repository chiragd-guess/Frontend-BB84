import ProgressTimeline from "../ProgressTimeline/ProgressTimeline";

export default function QuantumChannelPanel({ currentStage, simulation }) {
  const secure = simulation?.session?.secure;
  const aborted = simulation?.status === "aborted";
  const qber = simulation?.analytics?.qber;
  const keyLength = simulation?.analytics?.keyLength;

  const totalSteps = 8;
  const photonPct = Math.min(
    100,
    Math.max(0, ((currentStage - 0.5) / totalSteps) * 100)
  );

  return (
    <section className="quantum-channel-panel">

      <div className="quantum-channel-panel__head">
        <p className="quantum-channel-panel__title">
          Quantum Channel <span>(BB84 Protocol)</span>
        </p>

        <div className="quantum-channel-panel__stats">
          <div className="link-meta">
            <div className="k">Key Length</div>
            <div className="v">
              {keyLength ? `${keyLength} bits` : "— bits"}
            </div>
          </div>
          <div className="link-meta">
           
            <div className="v">
              
            </div>
          </div>
        </div>
      </div>

      <div className="stage-track-row">
        <div className={`link-avatar ${simulation?.initiator === "Bob" ? "bob" : ""}`}>
          {simulation?.initiator === "Bob" ? "B" : "A"}
        </div>

        <div className="stage-track-wrap">
          <div className="stage-line"></div>
          <div
            className={`photon ${aborted ? "alert" : ""}`}
            style={{ left: `${photonPct}%` }}
          ></div>

          <ProgressTimeline currentStage={currentStage} failed={aborted} />
        </div>

        <div className={`link-avatar ${simulation?.initiator === "Bob" ? "" : "bob"}`}>
          {simulation?.initiator === "Bob" ? "A" : "B"}
        </div>
      </div>

      <div
        className={`quantum-channel-panel__banner ${
          aborted
            ? "quantum-channel-panel__banner--danger"
            : secure
            ? "quantum-channel-panel__banner--success"
            : "quantum-channel-panel__banner--idle"
        }`}
      >
        <span className="quantum-channel-panel__banner-icon">
          {aborted ? "⚠" : secure ? "✓" : "◌"}
        </span>
        <p>
          {aborted
            ? "Transmission Aborted — High QBER"
            : secure
            ? "Quantum Key Established Successfully"
            : "Awaiting Key Exchange..."}
        </p>
      </div>

    </section>
  );
}