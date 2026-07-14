
# Frontend_BB84

A React + Vite frontend for an interactive **Quantum Secure Messenger** that demonstrates how the **BB84 Quantum Key Distribution (QKD) protocol** enables secure communication between two users, Alice and Bob.

The application visualises every stage of the quantum communication process, from photon preparation and transmission to key generation, message encryption, and successful decryption.

---

# Project Overview

This project serves as the frontend for a Quantum Secure Messenger simulator developed as part of our quantum cryptography project.

Rather than focusing only on sending encrypted messages, the application demonstrates **how quantum mechanics can be used to establish a secure cryptographic key** before any classical encryption takes place.

The frontend provides an intuitive dashboard where users can observe each stage of the BB84 protocol while interacting with a modern messaging interface.

The backend performs all protocol simulation, quantum calculations, key generation, encryption, QBER estimation, and message processing. The frontend visualises those results in real time.

---

# Project Objectives

The primary objectives of this project are to:

* Demonstrate the BB84 Quantum Key Distribution protocol
* Simulate secure communication between Alice and Bob
* Visualise every stage of the quantum communication process
* Display security metrics such as QBER and key length
* Provide an educational and interactive quantum cryptography demonstration
* Connect a React frontend with a FastAPI backend

---

# How the System Works

The complete workflow is illustrated below.

## Phase 1 — User Interaction

The sender (Alice) begins by:

1. Selecting the communication channel.
2. Configuring channel noise.
3. Enabling or disabling Eve (eavesdropper) simulation.
4. Writing a plaintext message.
5. Starting the secure transmission.

---

## Phase 2 — BB84 Quantum Key Distribution

After the user starts the simulation, the backend performs the BB84 protocol.

The protocol proceeds through the following stages:

1. Random bit generation
2. Random basis generation
3. Photon preparation
4. Photon transmission
5. Bob's random basis measurement
6. Basis comparison
7. Key sifting
8. QBER estimation
9. Shared secret key generation

The frontend visualises every one of these steps.

---

## Phase 3 — Secure Communication

Once a secure shared key has been generated:

1. The plaintext message is encrypted.
2. Ciphertext is transmitted.
3. Bob receives the ciphertext.
4. Bob decrypts the message using the shared key.
5. The decrypted message is displayed.

---

## Phase 4 — Results & Analytics

After communication completes, the dashboard displays:

* Quantum Bit Error Rate (QBER)
* Shared key length
* Number of photons transmitted
* Communication status
* Simulation duration
* Channel configuration
* Session summary

---

# Frontend Responsibilities

The frontend is responsible for:

* Interactive dashboard
* Alice and Bob communication panels
* Message composition
* Chat interface
* BB84 workflow visualisation
* Quantum channel animation
* Session monitoring
* Analytics dashboard
* Communication history
* Backend API integration
* Responsive interface

---

# Current Frontend Structure

```text
src/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── AlicePanel/
│   ├── AnalyticsChart/
│   ├── BobPanel/
│   ├── ChatWindow/
│   ├── KeyExchangeVisualizer/
│   ├── LoadingOverlay/
│   ├── MessageComposer/
│   ├── Navbar/
│   ├── ProgressTimeline/
│   ├── QuantumChannelPanel/
│   ├── QuickControls/
│   ├── SessionSummary/
│   ├── StatusCard/
│   ├── StatusPill/
│   └── TopBar/
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── Dashboard/
│   ├── Analytics/
│   └── History/
│
├── routes/
│   └── AppRouter.jsx
│
├── services/
│   └── api.js
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── App.jsx
└── main.jsx
```

---

# Main Pages

## Dashboard

The primary interface of the application.

Includes:

* Alice panel
* Bob panel
* Secure messaging interface
* BB84 protocol timeline
* Quantum channel visualisation
* Simulation controls
* Session statistics

---

## Analytics

Displays simulation metrics including:

* QBER
* Key generation statistics
* Photon transmission statistics
* Future performance visualisations

---

## History

Stores previous communication sessions including:

* Session metadata
* Security status
* QBER
* Generated key length
* Communication logs

---

# Technology Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* CSS3

### Backend (Planned)

* FastAPI
* Python
* NumPy
* Qiskit (if required)
* REST APIs

---

# Backend Integration

During initial development the frontend uses mock data.

Later the backend will expose REST endpoints that return:

* Simulation status
* Generated shared keys
* QBER
* Photon statistics
* Encryption results
* Session information

The frontend will consume these APIs without major structural changes.

---

# Development Roadmap

## Phase 1 (Completed)

* Project setup
* React + Vite configuration
* Routing
* Folder architecture
* Component architecture
* Initial page layout
* Placeholder UI

---

## Phase 2 (Current)

* UI development
* Responsive layout
* Component styling
* Quantum channel visualisation
* Dashboard refinement

---

## Phase 3

* Mock API integration
* Interactive simulation
* State management
* Loading states
* Error handling

---

## Phase 4

Backend integration:

* BB84 implementation
* API connectivity
* Live simulation
* Secure message exchange
* Real-time status updates

---

## Phase 5

Future improvements:

* Multi-user communication
* Multiple quantum channels
* Advanced analytics
* Dark mode improvements
* Better animations
* Accessibility enhancements

---

# Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# Project Status

**Current Progress**

* React application configured
* Routing implemented
* Component architecture established
* Dashboard layout created
* Placeholder interface completed

**Next Milestone**

* Complete UI styling
* Add animations
* Integrate mock APIs
* Connect FastAPI backend
* Implement live BB84 simulation

---

## One recommendation

I would rename the repository from **`Frontend_BB84`** to something like **`QuantumSecureMessenger`** or **`QuantumSecureMessenger-Frontend`** once your mentor approves. It better reflects the project's purpose than a name focused solely on the BB84 protocol.
