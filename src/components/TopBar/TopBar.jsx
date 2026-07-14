import StatusPill from "../StatusPill/StatusPill";

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <p>[Logo]</p>
        <div>
          <p>App Name</p>
          <p>App Subtitle</p>
        </div>
      </div>

      <div className="top-bar__pills">
        <StatusPill label="Channel Type" value="Ideal" />
        <StatusPill label="Noise Level" value="0%" />
        <StatusPill label="Eve Interference" value="OFF" />
      </div>

      <button>Reset Simulation</button>
    </header>
  );
}