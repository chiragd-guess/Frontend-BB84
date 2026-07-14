const summary = [
    { label: "Start Time", value: "--:--:--" },
    { label: "Duration", value: "00:00:00" },
    { label: "Noise Level", value: "0%" },
    { label: "Eve Interference", value: "OFF" },
    { label: "Status", value: "placeholder" },
    { label: "Session ID", value: "placeholder" },
  ];
  
  export default function SessionSummary() {
    return (
      <div className="session-summary">
        <p>Session Summary</p>
        {summary.map((row) => (
          <div key={row.label} className="session-summary__row">
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    );
  }