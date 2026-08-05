import { useState } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import QuickControls from "../components/QuickControls/QuickControls";

import { createInitialSimulation } from "../data/initialstate";

import { runSimulation } from "../services/simulationService";

import {
  updateNoise,
  updateEve,
  resetSimulation,
} from "../services/simulationControls";


export default function MainLayout() {

  const [simulation, setSimulation] = useState(
    createInitialSimulation()
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const setNoiseLevel = (value) => {
    updateNoise(setSimulation, value);
  };

  const setEveEnabled = (value) => {
    updateEve(setSimulation, value);
  };

  const handleReset = () => {
    resetSimulation(setSimulation);
  };

  const handleRun = () => {
    if (simulation.status === "running") return;
    runSimulation(setSimulation);
  };

  return (
    <div className="app-shell">

      <TopBar
        simulation={simulation}
        onReset={handleReset}
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((v) => !v)}
      />

      <div className={`drawer-wrap ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-inner">

          <Navbar simulation={simulation} />

          <QuickControls
            noiseLevel={simulation.channel.noise}
            eveEnabled={simulation.channel.eve}
            onNoiseChange={setNoiseLevel}
            onEveChange={setEveEnabled}
            onRun={handleRun}
            setSimulation={setSimulation}
          />

        </div>
      </div>

      <main className="main-content">
        <Outlet
          context={{
            simulation,
            setSimulation
          }}
        />
      </main>

      <footer className="footer-disclaimer">
        <p>
          Educational simulation only. Not for real cryptographic use.
        </p>
      </footer>

    </div>
  );
}