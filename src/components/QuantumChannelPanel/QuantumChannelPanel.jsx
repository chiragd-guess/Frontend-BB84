import ProgressTimeline from "../ProgressTimeline/ProgressTimeline";
import KeyExchangeVisualizer from "../KeyExchangeVisualizer/KeyExchangeVisualizer";

export default function QuantumChannelPanel() {
  return (
    <section className="quantum-channel-panel">
      <p>Quantum Channel (BB84 Protocol)</p>

      <ProgressTimeline />
      <KeyExchangeVisualizer />

      <div className="quantum-channel-panel__banner">
        <p>[Result Banner Placeholder — e.g. "Quantum Key Established Successfully"]</p>
      </div>
    </section>
  );
}