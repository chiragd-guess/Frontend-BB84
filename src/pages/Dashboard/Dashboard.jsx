import { useState } from "react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import QuickControls from "../../components/QuickControls/QuickControls";
import AlicePanel from "../../components/AlicePanel/AlicePanel";
import QuantumChannelPanel from "../../components/QuantumChannelPanel/QuantumChannelPanel";
import BobPanel from "../../components/BobPanel/BobPanel";
import StatusCard from "../../components/StatusCard/StatusCard";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import SessionSummary from "../../components/SessionSummary/SessionSummary";

import { createInitialSimulation } from "../../data/mockData";
import { runSimulation } from "../../services/simulationService";
import {
  updateNoise,
  updateEve,
  resetSimulation,
} from "../../services/simulationControls";

export default function Dashboard() {
  const [simulation, setSimulation] = useState(createInitialSimulation());

  const noiseLevel = simulation.channel.noise;
  const eveEnabled = simulation.channel.eve;

  const setNoiseLevel = (val) => updateNoise(setSimulation, val);
  const setEveEnabled = (val) => updateEve(setSimulation, val);
  const handleReset   = ()    => resetSimulation(setSimulation);

  const handleRun = () => {
    if (simulation.status === "running") return;
    runSimulation(setSimulation);
  };

  return (
    <div className="app-shell">

      <TopBar
        simulation={simulation}
        onReset={handleReset}
      />

      <div className="body">

        <aside className="sidebar">
          <Navbar simulation={simulation} />
          <QuickControls
            noiseLevel={noiseLevel}
            setNoiseLevel={setNoiseLevel}
            eveEnabled={eveEnabled}
            setEveEnabled={setEveEnabled}
            setSimulation={setSimulation}
            onRun={handleRun}
          />
        </aside>

        <main className="main-content">

          <div className="panels-row">
            <AlicePanel
              simulation={simulation}
              setSimulation={setSimulation}
            />
            <QuantumChannelPanel
              simulation={simulation}
              currentStage={simulation.protocol.stage}
            />
            <BobPanel
              simulation={simulation}
              setSimulation={setSimulation}
            />
          </div>

          <div className="bottom-row">

            <div className="quantum-statistics">
              <p>Quantum Statistics</p>
              <StatusCard
                label="QBER"
                value={`${simulation.analytics.qber}%`}
              />
              <StatusCard
                label="Key Length"
                value={`${simulation.analytics.keyLength} bits`}
              />
              <StatusCard
                label="Photons Sent"
                value={simulation.analytics.photonsSent}
              />
            </div>

            <div className="photon-chart">
              <p>Photon Transmission Overview</p>
              <AnalyticsChart simulation={simulation} />
            </div>

            <SessionSummary simulation={simulation} />

          </div>

        </main>

      </div>

      <footer className="footer-disclaimer">
        <p>Educational simulation only. Not for real cryptographic use.</p>
      </footer>

    </div>
  );
}