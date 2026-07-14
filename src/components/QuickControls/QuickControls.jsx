export default function QuickControls() {
    return (
      <div className="quick-controls">
        <p>Quick Controls</p>
  
        <div className="quick-controls__row">
          <label>Noise Level</label>
          <p>[Slider Placeholder — 0-20%]</p>
        </div>
  
        <div className="quick-controls__row">
          <label>Eve Interference</label>
          <p>[Toggle Placeholder]</p>
        </div>
  
        <div className="quick-controls__row">
          <label>Channel Type</label>
          <p>[Select Placeholder — Ideal]</p>
        </div>
  
        <button>Run Simulation</button>
      </div>
    );
  }