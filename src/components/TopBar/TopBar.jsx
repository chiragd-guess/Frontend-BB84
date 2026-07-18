import StatusPill from "../StatusPill/StatusPill";

export default function TopBar({ simulation, onReset }) {
  const status = simulation?.status ?? "idle";

  const pillLabel =
    status === "running"  ? "Running" :
    status === "aborted"  ? "Threat Detected" :
    status === "completed" && simulation?.session?.secure ? "Secure" :
    "Idle";

  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <p>⚛</p>
        <div>
          <p>Quantum Secure Messenger</p>
          <p>BB84 Key Distribution Protocol</p>
        </div>
      </div>

      <div className="top-bar__pills">
        <StatusPill label="Status" value={pillLabel} />
      </div>

      <button onClick={onReset}>Reset</button>
    </header>
  );
}