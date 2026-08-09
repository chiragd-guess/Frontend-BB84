import React from "react";

export default function About() {
const steps = [
["⚛", "1. Prepare", "Alice encodes bits into photons using random bases."],
["↗", "2. Send", "Photons are sent to Bob over a quantum channel."],
["◎", "3. Measure", "Bob measures each photon using a random basis."],
["⇄", "4. Compare", "They compare bases over a classical channel and keep matches."],
["⚿", "5. Key Generated", "A shared secret key is formed and used for encryption."],
];

const advantages = [
["⛨", "Unconditional Security", "Security guaranteed by quantum mechanics, not computational assumptions."],
["◉", "Eavesdropper Detection", "Any attempt to intercept photons introduces detectable disturbances."],
["⚿", "Perfect Forward Secrecy", "New keys are generated for every session, keeping future messages safe."],
["⚡", "Quantum Future Ready", "Built to explore and understand quantum communication technologies."],
];

const uses = [
["✉", "Secure Messaging", "End-to-end encrypted conversation."],
["⛨", "Military & Government", "Ultra-secure communication channels."],
["🏦", "Financial Systems", "Protect critical financial infrastructure."],
["◈", "IoT & Networks", "Secure device authentication & data."],
];

return ( <div className="about-page"> <section className="about-hero"> <h1>
About BB84 <span>// Sim</span> </h1> <p>Quantum secure communication using the BB84 protocol</p>

```
    <p>
      BB84 Sim is a quantum secure messenger simulator that demonstrates
      the BB84 Quantum Key Distribution protocol. It lets two parties
      generate a shared secret key using quantum mechanics, then exchange
      encrypted messages with unconditional security.
    </p>

    <div className="about-diagram">
      <span>Alice</span>
      <span>→</span>
      <span>Eve</span>
      <span>→</span>
      <span>Bob</span>
    </div>
  </section>

  <section className="about-grid">
    <div>
      <div className="about-panel">
        <h2>How BB84 Works</h2>

        <div className="steps">
          {steps.map(([icon, title, text]) => (
            <div className="step" key={title}>
              <div className="step-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-panel">
        <h2>BB84 Protocol Essentials</h2>

        <div className="essentials">
          <div>
            <h3>⤢ Bases</h3>
            <p>Rectilinear (+) and Diagonal (×)</p>
          </div>

          <div>
            <h3>01 Bits</h3>
            <p>
              0 → Horizontal / Left
              <br />
              1 → Vertical / Right
            </p>
          </div>

          <div>
            <h3>∴ Photons</h3>
            <p>Information is carried by single photons, one at a time.</p>
          </div>

          <div>
            <h3>✓ Key</h3>
            <p>Only matching bases are kept to form the secret key.</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div className="about-panel">
        <h2>Key Advantages</h2>

        {advantages.map(([icon, title, text]) => (
          <div className="advantage" key={title}>
            <span>{icon}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="about-panel">
        <h2>Use Cases</h2>

        <div className="use-cases">
          {uses.map(([icon, title, text]) => (
            <div key={title}>
              <span>{icon}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="about-bottom">
    <div className="about-panel">
      <h2>Technologies Used</h2>

      <div className="technologies">
        <span>⚛ Quantum Mechanics</span>
        <span>⚿ BB84 Protocol</span>
        <span>🔒 AES Encryption</span>
        <span>⌥ Python</span>
        <span>📈 Data Visualization</span>
      </div>
    </div>

    <div className="about-panel">
      <h2>About the Project</h2>

      <p>
        BB84 // Sim is an educational simulator built to make the concepts
        of quantum communication simple, interactive, and visual. It helps
        students, researchers, and developers understand how the future of
        secure communication works.
      </p>

      <small>Version 1.0.0 · Made with ⚛ and ♥</small>
    </div>

    <div className="about-panel">
      <h2>Developer</h2>
      <h3>Quantum Computing Team</h3>
      <p>Passionate about building the quantum future.</p>
    </div>
  </section>

  <footer>🔒 BB84 // SIM — Quantum Secure Communication</footer>
</div>

);
}
