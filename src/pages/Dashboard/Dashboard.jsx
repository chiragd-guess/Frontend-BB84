import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import QuickControls from "../../components/QuickControls/QuickControls";
import AlicePanel from "../../components/AlicePanel/AlicePanel";
import QuantumChannelPanel from "../../components/QuantumChannelPanel/QuantumChannelPanel";
import BobPanel from "../../components/BobPanel/BobPanel";
import StatusCard from "../../components/StatusCard/StatusCard";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import SessionSummary from "../../components/SessionSummary/SessionSummary";

export default function Dashboard() {
  return (
    <div className="app-shell">
      <TopBar />

      <div className="body">
        <aside className="sidebar">
          <Navbar />
          <QuickControls />
        </aside>

        <main className="main-content">
          <div className="panels-row">
            <AlicePanel />
            <QuantumChannelPanel />
            <BobPanel />
          </div>

          <div className="bottom-row">
            <div className="quantum-statistics">
              <p>Quantum Statistics</p>
              <StatusCard label="QBER" value="--%" />
              <StatusCard label="Key Length" value="-- bits" />
              <StatusCard label="Photons Sent" value="----" />
            </div>

            <div className="photon-chart">
              <p>Photon Transmission Overview</p>
              <AnalyticsChart />
            </div>

            <SessionSummary />
          </div>
        </main>
      </div>

      <footer className="footer-disclaimer">
        <p>[Disclaimer Placeholder]</p>
      </footer>
    </div>
  );
}