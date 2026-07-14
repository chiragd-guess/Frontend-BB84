const steps = [
  { id: 1, title: "Preparing Photons" },
  { id: 2, title: "Sending Photons" },
  { id: 3, title: "Bob Measuring" },
  { id: 4, title: "Basis Comparison / Sifting" },
  { id: 5, title: "QBER Estimation" },
  { id: 6, title: "Shared Key Generation" },
  { id: 7, title: "Message Encryption" },
  { id: 8, title: "Ciphertext Transmission" },
];

export default function ProgressTimeline() {
  return (
    <ol className="progress-timeline">
      {steps.map((step) => (
        <li key={step.id} className="progress-timeline__step">
          <p>[Icon]</p>
          <p>{step.id}. {step.title}</p>
          <p>[Status]</p>
        </li>
      ))}
    </ol>
  );
}