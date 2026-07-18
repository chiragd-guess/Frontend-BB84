import { useLocation } from "react-router-dom";
import StatusCard from "../../components/StatusCard/StatusCard";
import SessionSummary from "../../components/SessionSummary/SessionSummary";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import Navbar from "../../components/Navbar/Navbar";

export default function Analytics() {
  // Simulation is passed via router location state from Dashboard
  // Falls back to empty defaults if navigated to directly
  const location = useLocation();
  const simulation = location.state?.simulation ?? {
    status: "idle",
    analytics: { qber: 0, photonsSent: 0, keyLength: 0 },
    channel:   { noise: 0, eve: false },
    session:   { id: "---", secure: false, duration: "00:00" },
    messages:  [],
  };

  const securityStatus =
    simulation.status === "aborted"   ? "Threat Detected — Eve Intercepted" :
    simulation.session.secure          ? "Secure — Key Established" :
    "No Session";

  return (
    <div className="app-shell">

      <div className="body">

        <aside className="sidebar">
          <Navbar />
        </aside>

        <main className="main-content">

          <p>Analytics</p>

          {/* Security Status */}
          <div className="bottom-row">
            <StatusCard label="Security Status" value={securityStatus} />
            <StatusCard label="QBER"            value={`${simulation.analytics.qber}%`} />
            <StatusCard label="Key Length"      value={`${simulation.analytics.keyLength} bits`} />
          </div>

          {/* Transmission Stats */}
          <div className="bottom-row">
            <StatusCard label="Photons Sent"     value={simulation.analytics.photonsSent} />
            <StatusCard label="Noise Level"       value={`${simulation.channel.noise}%`} />
            <StatusCard label="Eve Interference"  value={simulation.channel.eve ? "ON" : "OFF"} />
          </div>

          {/* Chart */}
          <div className="photon-chart">
            <p>Photon Transmission Overview</p>
            <AnalyticsChart simulation={simulation} />
          </div>

          {/* Session */}
          <SessionSummary simulation={simulation} />

        </main>

      </div>

    </div>
  );
}