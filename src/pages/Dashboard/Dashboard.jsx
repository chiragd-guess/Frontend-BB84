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
import { initialSimulation } from "../../data/mockData";

const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 600;
const ABORT_THRESHOLD = 11;

export default function Dashboard() {
  const [simulation, setSimulation] = useState(initialSimulation);

  const noiseLevel = simulation.channel.noise;
  const eveEnabled = simulation.channel.eve;

  const setNoiseLevel = (val) =>
    setSimulation((prev) => ({
      ...prev,
      channel: { ...prev.channel, noise: val },
    }));

  const setEveEnabled = (val) =>
    setSimulation((prev) => ({
      ...prev,
      channel: { ...prev.channel, eve: val },
    }));

  const handleReset = () => {
    setSimulation({ ...initialSimulation, initiator: null });
  };

  const handleRun = () => {
    if (simulation.status === "running") return;

    let aborted = false;
    let stage = 1;

    setSimulation((prev) => ({
      ...prev,
      status: "running",
      protocol: { stage: 0 },
    }));

    const interval = setInterval(() => {
      if (aborted) return;

      setSimulation((s) => ({ ...s, protocol: { stage } }));

      if (stage === 5) {
        setTimeout(() => {
          setSimulation((s) => {
            const qber = s.channel.eve
              ? 25.0
              : parseFloat((Math.random() * 3 + 1).toFixed(2));

            if (qber > ABORT_THRESHOLD) {
              aborted = true;
              clearInterval(interval);
              return {
                ...s,
                status: "aborted",
                protocol: { stage: 5 },
                analytics: { qber, photonsSent: 512, keyLength: 0 },
                session: { ...s.session, secure: false },
                messages: [
                  ...s.messages,
                  {
                    id: Date.now(),
                    sender: "system",
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    text: `⚠ BB84 Protocol Aborted — Eve detected (QBER: ${qber}%). Shared key discarded. Disable Eve and retry.`,
                  },
                ],
              };
            }
            return s;
          });
        }, 100);
      }

      stage++;

      if (stage > TOTAL_STAGES) {
        clearInterval(interval);
        setSimulation((s) => {
          if (s.status === "aborted") return s;
          const qber = parseFloat((Math.random() * 3 + 1).toFixed(2));
          return {
            ...s,
            status: "completed",
            protocol: { stage: TOTAL_STAGES },
            analytics: { qber, photonsSent: 512, keyLength: 256 },
            session: {
              id: `QKD-${Date.now().toString().slice(-4)}`,
              secure: true,
              duration: "1.3 s",
            },
          };
        });
      }
    }, STAGE_DELAY_MS);
  };

  return (
    <div className="app-shell">
      <TopBar
        noiseLevel={noiseLevel}
        eveEnabled={eveEnabled}
        onReset={handleReset}
      />

      <div className="body">
        <aside className="sidebar">
          <Navbar />
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
        <p>[Disclaimer Placeholder]</p>
      </footer>
    </div>
  );
}