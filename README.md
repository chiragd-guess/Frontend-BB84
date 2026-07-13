# Frontend_BB84

A React-based frontend for a quantum-secure messaging platform that visualises the complete BB84 communication workflow, from message composition to secure transmission and decryption.

---

## Project Overview

This project provides the user interface for a **Quantum Secure Messaging** application. The goal is to create an intuitive and interactive web application that demonstrates how **BB84 Quantum Key Distribution (QKD)** can be integrated with classical symmetric encryption to enable secure communication.

The frontend is responsible for collecting user input, visualising each stage of the communication process, displaying security metrics, and interacting with the backend through REST APIs.

The actual BB84 simulation, key generation, encryption, and security verification are performed by the backend, while this application presents those results in a clean and user-friendly interface.

---

## Communication Workflow

The application follows this workflow:

1. User selects a recipient.
2. User enters a message.
3. User initiates secure communication.
4. Backend performs BB84 key generation.
5. Shared key is verified using QBER.
6. Message is encrypted using the generated shared key.
7. Ciphertext is transmitted.
8. Receiver decrypts the message.
9. Frontend displays communication status, security information, and technical details.

---

## Frontend Responsibilities

* Modern dashboard interface
* Message composition interface
* Recipient selection
* Communication progress visualisation
* BB84 workflow timeline
* Security status display
* QBER visualisation
* Technical information panel
* Analytics dashboard
* Communication history
* Backend API integration
* Responsive user interface

---

## Planned Pages

### Dashboard

The primary interface where users compose messages and initiate secure communication.

Features:

* Recipient selection
* Message editor
* Send Securely button
* Communication workflow timeline
* Security status cards
* Technical details panel

---

### Analytics

Displays visual representations of communication metrics, including:

* QBER trends
* Noise analysis
* Key generation statistics
* Future network performance metrics

---

### History

Shows previous secure communication sessions along with their security status and communication metadata.

---

## Technology Stack

* React
* Vite
* JavaScript
* ESLint
* HTML5
* CSS3 (or Tailwind CSS if adopted)

---

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
├── services/
├── data/
├── styles/
├── App.jsx
└── main.jsx
```

---

## Backend Integration

The frontend communicates with the backend using REST APIs.

Initially, mock data will be used during UI development. Once the backend is complete, API calls will replace the mock responses without requiring major UI changes.

---

## Future Enhancements

* Multiple-user communication
* Multi-node network visualisation
* Live BB84 simulation
* Real-time communication status
* Photon transmission animation
* Enhanced analytics
* Improved accessibility
* Dark mode refinements

---

## Development

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

## Project Status

Current Stage:

* Project initialisation completed
* React + Vite environment configured
* Frontend architecture established
* Component structure created

Next Stage:

* Dashboard implementation
* Component development
* API integration
* Backend connectivity
* UI refinement



## Project Structure

```text
QuantumSecureMessenger/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── MessageComposer/
│   │   │   ├── ProgressTimeline/
│   │   │   ├── StatusCard/
│   │   │   ├── TechnicalDetails/
│   │   │   ├── LoadingOverlay/
│   │   │   └── AnalyticsChart/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Analytics/
│   │   │   └── History/
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── data/
│   │   │   └── mockData.js
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── tests/
│   └── requirements.txt
│
├── docs/
│   ├── api.md
│   ├── workflow.md
│   └── ui_reference.png
│
├── README.md
├── .gitignore
└── LICENSE
```

### Directory Overview

| Directory     | Purpose                                                                              |
| ------------- | ------------------------------------------------------------------------------------ |
| `frontend/`   | React application responsible for the user interface and user interaction.           |
| `backend/`    | FastAPI application implementing BB84, QBER analysis, encryption, and API endpoints. |
| `components/` | Reusable UI components used throughout the application.                              |
| `pages/`      | Main application screens such as Dashboard, Analytics, and History.                  |
| `services/`   | Handles communication between the frontend and backend APIs.                         |
| `data/`       | Mock responses used during frontend development before backend integration.          |
| `styles/`     | Global styling, colour variables, and shared UI styles.                              |
| `docs/`       | Project documentation, API specifications, workflow diagrams, and UI references.     |
| `tests/`      | Backend unit and integration tests.                                                  |
