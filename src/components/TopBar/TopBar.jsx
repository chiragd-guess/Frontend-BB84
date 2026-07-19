import StatusPill from "../StatusPill/StatusPill";
import logo from "../../assets/images/logo.png";

export default function TopBar({ simulation, onReset }) {
  const status = simulation?.status ?? "idle";

  const pillLabel =
    status === "running"
      ? "Running"
      : simulation?.channel?.eve
      ? "Eve Interfered"
      : status === "aborted"
      ? "Threat Detected"
      : status === "completed" && simulation?.session?.secure
      ? "Secure"
      : "Idle";

  return (
    <header className="top-bar dashboard-header">

      <div className="dashboard-header__left">

  <div className="dashboard-header__logo">
    <img
      src={logo}
      alt="Quantum Secure Messenger"
      className="dashboard-header__logo-image"
    />
  </div>

  <div className="dashboard-header__title-group">
    <h1 className="dashboard-header__title">
      Quantum Secure Messenger
    </h1>

    <p className="dashboard-header__subtitle">
      BB84 Key Distribution Protocol
    </p>
  </div>

</div>

      <div className="dashboard-header__right">

        <div className="dashboard-header__status">
          <StatusPill label="Status" value={pillLabel} />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="dashboard-header__reset-btn"
        >
          Reset Session
        </button>

      </div>

    </header>
  );
}