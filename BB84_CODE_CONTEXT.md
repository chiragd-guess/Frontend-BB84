{
  "name": "frontend-bb84",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.1.1"
  }
}
import AppRouter from "./routes/AppRouter";

export default function App() {

  return <AppRouter />;

}import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

import "./styles/themes.css";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const ThemeContext = createContext(null);



export function ThemeProvider({ children }) {


  const [theme,setTheme] = useState(() => {

    const saved =
      localStorage.getItem("bb84-theme");


    if(saved==="light" || saved==="dark"){
      return saved;
    }


    return window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches
      ? "light"
      : "dark";

  });



  useEffect(()=>{

    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );


    localStorage.setItem(
      "bb84-theme",
      theme
    );


  },[theme]);



  const toggleTheme = () => {

    setTheme(prev =>
      prev==="dark"
      ? "light"
      : "dark"
    );

  };


  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}



export function useTheme(){

  return useContext(ThemeContext);

}import StatusPill from "../StatusPill/StatusPill";
import logo from "../../assets/images/logo.png";

export default function TopBar({ simulation, onReset }) {
  const status = simulation?.status ?? "idle";

  const pillLabel =
    status === "running"
      ? "Running"
      : simulation?.channel?.eve
      ? "Eve Interfered"
      : status === "aborted"
      ? "Threat Detected"
      : status === "completed" && simulation?.session?.secure
      ? "Secure"
      : "Idle";

  return (
    <header className="top-bar dashboard-header">

      <div className="dashboard-header__left">

  <div className="dashboard-header__logo">
    <img
      src={logo}
      alt="Quantum Secure Messenger"
      className="dashboard-header__logo-image"
    />
  </div>

  <div className="dashboard-header__title-group">
    <h1 className="dashboard-header__title">
      Quantum Secure Messenger
    </h1>

    <p className="dashboard-header__subtitle">
      BB84 Key Distribution Protocol
    </p>
  </div>

</div>

      <div className="dashboard-header__right">

        <div className="dashboard-header__status">
          <StatusPill label="Status" value={pillLabel} />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="dashboard-header__reset-btn"
        >
          Reset Session
        </button>

      </div>

    </header>
  );
}import ThemeToggle from "../ui/ThemeToggle";
export default function QuickControls({
  noiseLevel,
  setNoiseLevel,
  eveEnabled,
  setEveEnabled,
  onRun,
  setSimulation,
}) {


  const handleEveToggle = (e) => {

    const enabled = e.target.checked;


    setEveEnabled(enabled);


    // Auto recover after Eve is removed
    if (!enabled) {

      setSimulation((prev) => {

        if (prev.status !== "aborted") {
          return prev;
        }


        return {

          ...prev,

          status: "idle",

          protocol:{
            stage:0,
          },


          analytics:{
            qber:0,
            photonsSent:0,
            keyLength:0,
          },


          session:{
            id:"---",
            secure:false,
            duration:"00:00",
          },


          abortReason:"",

        };

      });

    }

  };



  return (

    <div className="quick-controls">

      <p>Quick Controls</p>


      <div className="quick-controls__row">

        <label htmlFor="noise-slider">
          Noise 
        </label>


       
        <input
  className="noise-slider"
  id="noise-slider"
  type="range"
  min="0"
  max="20"
  step="1"
  value={noiseLevel}
  onChange={(e)=>setNoiseLevel(Number(e.target.value))}
/>


        <span>
          {noiseLevel}%
        </span>


      </div>




      <div className="quick-controls__row">


        <label htmlFor="eve-toggle">
          Eve
        </label>



        <input

          id="eve-toggle"

          type="checkbox"

          checked={eveEnabled}

          onChange={handleEveToggle}

        />


        <span>
          {eveEnabled ? "ON" : "OFF"}
        </span>


      </div>



      <button onClick={onRun}>
  Run Simulation
</button>

<ThemeToggle />


    </div>

  );

}[data-theme="dark"] {
  --button-text:#141414;
  --accent-soft:rgba(237,125,39,.12);

  /* WARNING STATES */
  --warning:#f59e0b;
  --warning-bg:rgba(245,158,11,.12);
  --warning-text:#fef3c7;

  --success:#22c55e;
  --danger:#ef4444;
  --info:#60a5fa;
    /* Quantum Environment */
    --quantum-glow:
    rgba(237,125,39,.18);
  
    --quantum-grid:
    rgba(237,125,39,.06);


  /* MAIN REFERENCE COLORS */

  --bg:#141414;

  --bg-panel:
rgba(65,66,58,.75);

  --surface:
  rgba(0,0,0,.25);


  --text-primary:#F8FAFC;
  --text-secondary:#A8A29E;


  --accent:#ED7D27;

  --accent-hover:#D9641E;


  --border-color:
  rgba(236,226,210,.28);



  /* CARDS */
  --card-bg:
linear-gradient(
    180deg,
    rgba(20,20,20,.35),
    rgba(20,20,20,.65)
);


  --shadow:
  0 20px 60px rgba(0,0,0,.35);



  /* IMPORTANT:
     BACKGROUND DOT PATTERN
  */


  --background-pattern:

radial-gradient(
  circle,
  rgba(217,100,30,.18) 1px,
  transparent 1.2px
),
radial-gradient(
  circle,
  rgba(217,100,30,.18) .5px,
  transparent .7px
);
}
/* ================= LIGHT MODE ================= */


[data-theme="light"] {
  --button-text:#ffffff;
  --accent-soft:rgba(217,100,30,.10);
  --warning:#d97706;
  --warning-bg:rgba(217,100,30,.10);
  --warning-text:#78350f;

  --success:#16a34a;
  --danger:#dc2626;
  --info:#2563eb;
  /* Quantum Environment */
  --quantum-glow:
  rgba(217,100,30,.10);

  --quantum-grid:
  rgba(217,100,30,.04);


  --bg:#F7F7F7;


  --bg-panel:
rgba(236,226,210,.75);


  --surface:
  rgba(255,255,255,.75);



  --text-primary:#18181B;
  --text-secondary:#52525B;



  --accent:#D9641E;


  --accent-hover:#B94E12;



  --border-color:
  rgba(65,66,58,.32);



  --card-bg:
linear-gradient(
    180deg,
    rgba(255,255,255,.55),
    rgba(255,255,255,.78)
);



  --shadow:

  0 20px 60px rgba(65,66,58,.12);



  --warning:#d97706;

  --warning-bg:
  rgba(217,119,6,.12);

  --warning-text:#92400e;



  --background-pattern:

radial-gradient(
  circle,
  rgba(217,100,30,.25) .8px,
  transparent .8px
);
}

/* ================= GLOBAL THEME ================= */


html,
body{
    background-color:var(--bg);

    background-image:
        var(--background-pattern),
        url("../assets/quantum-bg.svg");

    background-size:
        28px 28px,
        cover;

    background-repeat:
        repeat,
        no-repeat;

    background-attachment:
        fixed,
        fixed;
}
/* cards */

.alice-panel,
.quantum-channel-panel,
.bob-panel,
.quantum-statistics,
.photon-chart,
.session-summary,
.quick-controls,
.status-card,
.status-pill,
.message-composer,
.chat-window,
.key-exchange-visualizer,
.analytics-chart {



  background: var(--card-bg);


  border:
  1px solid var(--border-color);


  box-shadow:
  var(--shadow);


  backdrop-filter:
  blur(4px);

}



/* inputs */


input,
textarea,
select {


  background:
  var(--surface);


  color:
  var(--text-primary);


  border:
  1px solid var(--border-color);

}



::placeholder {

  color:
  var(--text-secondary);

  opacity:.55;

}
/* ============================================================
   GLOBALS — BB84 Quantum Theme
   Browser Reset + Typography + Native Elements
   ============================================================ */

   @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");

   /* ---------- Reset ---------- */
   
   *,
   *::before,
   *::after{
       margin:0;
       padding:0;
       box-sizing:border-box;
   }
   
   html{
       width:100%;
       min-height:100%;
       scroll-behavior:smooth;
       overflow-x:hidden;
   }
   
   body{
       width:100%;
       min-height:100vh;
       overflow-x:hidden;
       position:relative;
    z-index:0;
   
       font-family:"Inter",sans-serif;
       font-size:15px;
       line-height:1.65;
   
       color:var(--text-primary);
       background-color:var(--bg);

       background-image:url("../assets/quantum-bg.svg");
   
       background-size:cover;
   
       background-repeat:no-repeat;
   
       background-position:center;
   
       background-attachment:fixed;
   
       color:var(--text-primary);
   
       -webkit-font-smoothing:antialiased;
       -moz-osx-font-smoothing:grayscale;
   
       transition:
           background .25s ease,
           color .25s ease;
   }
   
   /* ---------- Typography ---------- */
   
   h1,
    h2,
    h3,
    h4,
    h5,
    h6{

        font-family:"Orbitron",sans-serif;
        color:var(--text-primary);
        font-weight:700;
        line-height:1.2;
        letter-spacing:-0.02em;

    }


h1{
    font-size:2.2rem;
}


h2{
    font-size:1.8rem;
}


h3{
    font-size:1.25rem;
}


h4{
    font-size:1rem;
}
   
   h1{font-size:2.4rem;}
   h2{font-size:2rem;}
   h3{font-size:1.55rem;}
   h4{font-size:1.15rem;}
   
   p{
       color:var(--text-secondary);
   }
   
   small{
       color:var(--text-secondary);
   }
   
   /* ---------- Lists ---------- */
   
   ul,
   ol{
       list-style:none;
   }
   
   /* ---------- Links ---------- */
   
   a{
   
       color:inherit;
   
       text-decoration:none;
   
       transition:.2s ease;
   
   }
   
   a:hover{
   
       color:var(--accent);
   
   }
   
   /* ---------- Images ---------- */
   
   img{
   
       display:block;
   
       max-width:100%;
   
   }
   
   /* ---------- Buttons ---------- */
   
   button{
   
       font-family:"JetBrains Mono",monospace;
   
       font-size:.84rem;
   
       letter-spacing:.06em;
   
       border:1px solid var(--border-color);
   
       background:var(--accent);

        color:var(--button-text);
   
       padding:.72rem 1rem;
   
       cursor:pointer;
   
       transition:all .18s ease;
   
   }
   
   button:hover{
   
       background:var(--accent-hover);
   
       transform:translateY(-1px);
   
   }
   
   button:active{
   
       transform:translateY(0);
   
   }
   
   button:disabled{
   
       opacity:.55;
   
       cursor:not-allowed;
   
   }
   
   /* ---------- Inputs ---------- */
   
   input,
   textarea,
   select{
   
       width:100%;
   
       font-family:inherit;
   
       font-size:.95rem;
   
       background:var(--surface);
   
       color:var(--text-primary);
   
       border:1px solid var(--border-color);
   
       padding:.8rem .9rem;
   
       transition:.18s ease;
   
   }
   
   textarea{
   
       resize:vertical;
   
       min-height:120px;
   
   }
   
   input:focus,
   textarea:focus,
   select:focus{
   
       outline:none;
   
       border-color:var(--accent);
   
       box-shadow:0 0 0 3px rgba(217,100,30,.15);
   
   }
   
   /* ---------- Placeholder ---------- */
   
   ::placeholder{
   
       color:var(--text-secondary);
   
       opacity:.5;
   
   }
   
   /* ---------- Selection ---------- */
   
   ::selection{
   
       background:rgba(217,100,30,.25);
   
   }
   
   /* ---------- Scrollbar ---------- */
   
   ::-webkit-scrollbar{
   
       width:10px;
   
       height:10px;
   
   }
   
   ::-webkit-scrollbar-track{
   
       background:transparent;
   
   }
   
   ::-webkit-scrollbar-thumb{
   
       background:var(--border-color);
   
   }
   
   ::-webkit-scrollbar-thumb:hover{
   
       background:var(--accent);
   
   }
   
   /* ---------- Code ---------- */
   
   code,
   pre{
   
       font-family:"JetBrains Mono",monospace;
   
   }
   
   /* ---------- Horizontal Rule ---------- */
   
   hr{
   
       border:none;
   
       border-top:1px solid var(--border-color);
   
   }

   /* ============================================================
   THEME TOGGLE
============================================================ */


.theme-toggle {

    display:flex;
  
    align-items:center;
  
    justify-content:center;
  
    gap:8px;
  
  
    background:var(--surface);
  
    color:var(--text-primary);
  
  
    border:
  
    1px solid var(--border-color);
  
  
    padding:
  
    6px 12px;
  
  
    cursor:pointer;
  
  
    font-size:14px;
  
  
    transition:
  
    transform .2s ease,
    border-color .2s ease,
    background .2s ease;
  
  }
  
  
  
  .theme-toggle:hover {
  
    transform:
    translateY(-2px);
  
  
    border-color:
    var(--accent);
  
  }
  
  
  
  .theme-toggle span {
  
    opacity:.35;
  
    transition:
    opacity .2s ease;
  
  }
  
  
  
  .theme-toggle span.active {
  
    opacity:1;
  
  }
/* ================= QUANTUM BACKGROUND FIELD ================= */


body::before {

  content:"";

  position:fixed;

  inset:0;

  pointer-events:none;

  z-index:0;


  background:

  radial-gradient(
    circle at 20% 30%,
    var(--quantum-glow),
    transparent 18%
),

  radial-gradient(
    circle at 80% 70%,
    var(--quantum-glow),
    transparent 20%
  );


  animation:

  quantumPulse 8s ease-in-out infinite;

}



/* moving quantum grid */

body::after {

  content:"";

  position:fixed;

  inset:-100px;

  pointer-events:none;

  z-index:0;


  background-image:

  linear-gradient(
    90deg,
    var(--quantum-grid) 1px,
    transparent 1px
  ),

  linear-gradient(
    0deg,
    var(--quantum-grid)1px,
    transparent 1px
  );


  background-size:

  80px 80px;


  animation:

  quantumGrid 18s linear infinite;

  opacity:.35;

}



@keyframes quantumPulse {

  0%,
  100% {

    transform:scale(1);

    opacity:.7;

  }


  50% {

    transform:scale(1.15);

    opacity:1;

  }

}



@keyframes quantumGrid {

  from {

    transform:translate(0,0);

  }


  to {

    transform:translate(80px,80px);

  }

}
/* ============================================================
   COMPONENTS
   PART 1
   ============================================================ */


/* ---------------- APP ---------------- */

.app-shell{

  min-height:100vh;

  width:100%;

  max-width:none;

  margin:0;

  display:flex;

  flex-direction:column;

  background:transparent;

  border:none;

}


/* ---------------- TOP BAR ---------------- */
/* ================= THEME TOGGLE ================= */

.theme-toggle {

  display:flex;

  align-items:center;

  gap:8px;

  padding:8px 14px;

  background:transparent;

  color:var(--text-primary);

  border:1px solid var(--border-color);

  font-family:"JetBrains Mono",monospace;

  font-size:11px;

  letter-spacing:.12em;

  text-transform:uppercase;

  transition:.2s ease;

}


.theme-toggle:hover {

  border-color:var(--accent);

  color:var(--accent);

  transform:translateY(-1px);

}


.theme-toggle__icon {

  font-size:14px;

}


.theme-toggle__text {

  font-size:10px;

}

/* ================= DASHBOARD HEADER ================= */

.dashboard-header{

  display:flex;
  justify-content:space-between;
  align-items:center;

  width:100%;

}


.dashboard-header__left{

  display:flex;
  align-items:center;
  gap:18px;

}


.dashboard-header__right{

  display:flex;
  align-items:center;
  gap:16px;

  margin-left:auto;

}


.dashboard-header__status{

  display:flex;
  align-items:center;

}



.top-bar__brand{

  display:flex;
  align-items:center;
  gap:16px;

}


.top-bar__brand h1{

  font-size:24px;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.03em;

}


.top-bar__brand small{

  display:block;

  font-family:"JetBrains Mono",monospace;

  font-size:10px;

  letter-spacing:.22em;

  text-transform:uppercase;

  color:var(--accent);

}


.top-bar__pills{

  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;

}


/* ← ADD THE NEW CSS HERE */

/* ================================
   DASHBOARD HEADER LEFT SECTION
================================ */

.dashboard-header__left{
  display:flex;
  align-items:center;
  gap:18px;
}


/* ================================
   TITLE GROUP
================================ */

.dashboard-header__title-group{
  display:flex;
  flex-direction:column;
  justify-content:center;
}


/* ================================
   LOGO CONTAINER
================================ */

.dashboard-header__logo{
  position:relative;

  width:180px;
  height:auto;

  display:flex;
  align-items:center;
  justify-content:flex-start;

  overflow:hidden;
  border-radius:14px;

  flex-shrink:0;
}


/* ================================
   LOGO IMAGE
================================ */

.dashboard-header__logo-image{
  width:180px;
  height:auto;

  display:block;

  position:relative;
  z-index:1;

  filter:
    drop-shadow(0 0 8px rgba(237,125,39,.65))
    drop-shadow(0 0 20px rgba(237,125,39,.35));

  animation: quantumGlow 4s ease-in-out infinite;
}


/* ================================
   QUANTUM LIGHT SWEEP
================================ */

.dashboard-header__logo::after{
  content:"";

  position:absolute;

  top:-20%;
  left:-60%;

  width:35%;
  height:140%;

  background:linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,.45),
    transparent
  );

  transform:rotate(25deg);

  z-index:2;
  pointer-events:none;

  animation: quantumSweep 5s ease-in-out infinite;
}


/* ================================
   TITLE TEXT
================================ */

.dashboard-header__title{
  margin:0;

  line-height:1.1;

  font-weight:700;
}


.dashboard-header__subtitle{
  margin:4px 0 0;

  line-height:1;

  opacity:.75;
}


/* ================================
   QUANTUM GLOW ANIMATION
================================ */

@keyframes quantumGlow{

  0%,100%{
    filter:
      drop-shadow(0 0 7px rgba(237,125,39,.55))
      drop-shadow(0 0 18px rgba(237,125,39,.3));
  }


  50%{
    filter:
      drop-shadow(0 0 13px rgba(255,170,70,.75))
      drop-shadow(0 0 30px rgba(237,125,39,.45));
  }

}


/* ================================
   PHOTON SWEEP ANIMATION
================================ */

@keyframes quantumSweep{

  0%{
    left:-60%;
    opacity:0;
  }


  20%{
    opacity:.8;
  }


  45%{
    left:130%;
    opacity:0;
  }


  100%{
    left:130%;
    opacity:0;
  }

}

/* ---------------- BODY ---------------- */

.body{

  flex:1;

  display:flex;

  min-width:0;

}


/* ---------------- SIDEBAR ---------------- */

.sidebar{

  width:var(--sidebar-width);

  background:var(--bg-panel);

  border-right:1px solid var(--border-color);

  padding:24px;

  display:flex;

  flex-direction:column;

  gap:24px;

}


/* ---------------- NAV ---------------- */

.navbar ul{

  display:flex;

  flex-direction:column;

  gap:10px;

}


.nav-link{

  display:flex;

  align-items:center;

  gap:12px;

  padding:12px 14px;

  color:var(--text-secondary);

  border:1px solid transparent;

  transition:.18s;

  font-family:"JetBrains Mono",monospace;

  font-size:12px;

  letter-spacing:.06em;

  text-transform:uppercase;

}


.nav-link:hover{

  color:var(--text-primary);

  border-color:var(--border-color);

  background:rgba(255,255,255,.03);

}


.nav-link--active{

  background:rgba(217,100,30,.08);

  color:var(--accent);

  border-color:var(--accent);

}


/* ---------------- QUICK CONTROLS ---------------- */

.quick-controls{

  background:var(--accent-soft);

  border:1px solid var(--border-color);

  padding:14px;

  display:flex;

  flex-direction:column;

  gap:10px;

  backdrop-filter:blur(2px);

  box-shadow:var(--shadow);

}


.quick-controls h3{

  font-size:13px;

  letter-spacing:.08em;

  text-transform:uppercase;

}


.quick-controls__row {

  display:grid;

  grid-template-columns: minmax(0,1fr) 60px 28px;

  align-items:center;

  gap:6px;

  width:100%;

}

.quick-controls__row label {
  white-space: nowrap;
}

.noise-slider {

  width:60px;

  min-width:0px;

}

.quick-controls__row span {
  text-align: right;
  white-space: nowrap;
}


.quick-controls__row:last-child{

  border-bottom:none;

}


/* ---------------- MAIN ---------------- */

.main-content{

  flex:1;

  max-width:var(--content-max-width);

  margin:auto;

  padding:24px;

  display:flex;

  flex-direction:column;

  gap:20px;

}


/* ---------------- GRID ---------------- */

.panels-row{

  display:grid;

  grid-template-columns:

      minmax(0,1fr)

      minmax(0,1.45fr)

      minmax(0,1fr);

  gap:28px;

}


.bottom-row{

  display:grid;

  grid-template-columns:

      repeat(3,minmax(0,1fr));

  gap:24px;

}


/* ---------------- COMMON PANELS ---------------- */

.alice-panel,
.quantum-channel-panel,
.bob-panel,
.analytics-chart,
.session-summary,
.quantum-statistics,
.photon-chart,
.status-card,
.message-composer,
.chat-window,
.key-exchange-visualizer{

  background:var(--card-bg);

  border:1px solid var(--border-color);

  box-shadow:var(--shadow);

  backdrop-filter:blur(2px);

}


/* ---------------- HEADERS ---------------- */

.panel-header{

  display:flex;

  justify-content:space-between;

  align-items:center;

  padding-bottom:14px;

  margin-bottom:18px;

  border-bottom:1px solid var(--border);

}


/* ---------------- STATUS PILL ---------------- */

.status-pill{

  display:inline-flex;

  align-items:center;

  gap:8px;

  padding:6px 12px;

  border:1px solid var(--border-color);

  background:rgba(255,255,255,.03);

  font-family:"JetBrains Mono",monospace;

  font-size:10px;

  letter-spacing:.08em;

  text-transform:uppercase;

}


.status-pill::before{

  content:"";

  width:7px;

  height:7px;

  border-radius:50%;

  box-shadow:0 0 8px var(--accent);

}


/* ---- Alice / Quantum Channel / Bob Panels ---- */
.alice-panel,
.quantum-channel-panel,
.bob-panel {
  border:1px solid var(--border-color);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

/* ---- Message Composer ---- */
.message-composer {
  border:1px solid var(--border-color);
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.message-composer textarea {
  width: 100%;
}
/* ==========================================
   CHAT HEADER
========================================== */

.chat-header{

  display:flex;

  justify-content:space-between;

  align-items:center;

  padding:0 0 14px;

  margin-bottom:16px;

  border-bottom:1px solid var(--border-color);

}

.chat-user{

  display:flex;

  align-items:center;

  gap:12px;

}

.chat-avatar{

  width:46px;

  height:46px;

  border-radius:50%;

  display:flex;

  align-items:center;

  justify-content:center;

  font-size:22px;

  background:rgba(217,100,30,.12);

  border:1px solid var(--border-color);

  box-shadow:0 0 18px rgba(217,100,30,.12);

}

.chat-user-info{

  display:flex;

  flex-direction:column;

  gap:3px;

}

.chat-user-info h3{

  margin:0;

  font-size:15px;

  font-weight:600;

  color:var(--text-primary);

}

.chat-status{

  display:flex;

  align-items:center;

  gap:6px;

  font-size:12px;

  color:var(--text-secondary);

}

.chat-status-dot{

  width:8px;

  height:8px;

  border-radius:50%;

  background:#22c55e;

  box-shadow:0 0 10px #22c55e;

  animation:onlinePulse 2s infinite;

}

.chat-security{

  padding:6px 10px;

  border:1px solid rgba(217,100,30,.25);

  border-radius:999px;

  background:var(--accent-soft);

  color:var(--accent);

  font-size:10px;

  font-family:"JetBrains Mono",monospace;

  letter-spacing:.08em;

  text-transform:uppercase;

}

@keyframes onlinePulse{

  0%{
      transform:scale(1);
      opacity:1;
  }

  50%{
      transform:scale(1.35);
      opacity:.55;
  }

  100%{
      transform:scale(1);
      opacity:1;
  }

}

/* ---- Chat Window ---- */
.chat-window {
  border: 1px solid;
  padding: var(--space-sm);
  overflow-wrap: break-word;
}

.chat-window__messages {
  min-height:260px;

  display:flex;
  flex-direction:column;

  justify-content:center;

  gap:12px;

  padding:14px;
}

.chat-window__bubble {

  border:1px solid var(--border-color);

  padding:10px 14px;

  margin-top:8px;

  max-width:80%;

  line-height:1.4;

}

.chat-window__bubble--alice {
  align-self: flex-end;
  text-align: right;
}

.chat-window__bubble--bob {
  align-self: flex-start;
}

.chat-window__empty {

  opacity:.55;

  font-style:italic;

  text-align:center;

  font-family:"JetBrains Mono",monospace;

  font-size:12px;

}

.chat-window__system {


  margin:16px 0;


  padding:14px;


  border-radius:10px;


  border:

  1px solid var(--warning);



  background:

  var(--warning-bg);



  color:

  var(--warning-text);



  text-align:center;


  white-space:pre-line;


  font-size:.9rem;


  font-weight:500;

}
/* ---- Progress Timeline ---- */
.progress-step__content span {
  font-size: 8px;
  opacity: 0.65;
}

.progress-timeline__step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 0px 0;
}

.progress-step__icon {
  width: 24px;
  height: 24px;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-step__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-step__content h4 {
  font-size: 15px;
}

.progress-step__content span {
  font-size: 13px;
  opacity: 0.7;
}

.progress-step__line {
  position: absolute;
  left: 18px;
  top: 52px;
  width: 1px;
  height: calc(100% - 12px);
  background: currentColor;
  opacity: 0.25;
}

/* ---- Key Exchange Visualizer ---- */
.key-exchange-visualizer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  position: relative;
  border: 1px solid;
}

.endpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 2rem;
  min-width: 70px;
}

.photon-lane {
  flex: 1;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-top:1px solid var(--border-color);
  border-bottom:1px solid var(--border-color);
}

/* ---- Quantum States (travel through photon-lane) ---- */
.quantum-state {
  position: absolute;
  top: 50%;
  left: 0;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ---- Basis Message ---- */
.basis-message {
  position: absolute;
  top: 50%;
  left: 0;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ---- Message Photon ---- */
.message-photon {
  position: absolute;
  top: 50%;
  left: 0;
  font-size: 1.5rem;
}

/* ---- Eve Warning ---- */
.eve-warning {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  white-space: nowrap;
}

/* ---- Shared Key ---- */
.shared-key {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ---- Quantum Channel Panel Banner ---- */
.quantum-channel-panel__banner {
  border: 1px solid;
  padding: var(--space-md);
  text-align: center;
}

/* ---- Bob Panel ---- */
.bob-panel__decrypted,
.bob-panel__quick-reply {
  border: 1px solid;
  padding: var(--space-sm);
}

.bob-panel__technical {
  border: 1px solid;
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.bob-panel__technical-toggle {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}

.bob-panel__technical-toggle:hover {
  opacity: 1;
}

.bob-panel__technical-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.bob-panel__technical-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  border-bottom: 1px solid;
  padding-bottom: var(--space-xs);
}

.bob-panel__technical-row code {
  font-family: monospace;
  font-size: 0.8rem;
  word-break: break-all;
  opacity: 0.8;
}

/* ---- Bottom Row (Stats / Chart / Session Summary) ---- */
.bottom-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-xl);
}

/* ---- Analytics Chart ---- */
.analytics-chart {
  border: 1px solid;
  padding: var(--space-xl);
  text-align: center;
}

/* ---- Bottom Row Panels ---- */
.quantum-statistics,
.photon-chart,
.session-summary {
  border: 1px solid;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-width: 0;
}

/* ---- Status Card & Pill ---- */
.status-card {
  border: 1px solid;
  padding: var(--space-sm);
}

.status-pill {
  border: 1px solid;
  padding: var(--space-xs) var(--space-sm);
  display: inline-flex;
  gap: var(--space-xs);
}

/* ---- Session Summary ---- */
.session-summary__row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid;
  padding: var(--space-xs) 0;
}

/* ---- Footer Disclaimer ---- */
.footer-disclaimer {
  border-top: 1px solid;
  padding: var(--space-md) var(--space-xl);
  text-align: center;
}

/* ---- Loading Overlay ---- */
.loading-overlay {
  border: 1px solid;
  padding: var(--space-lg);
  text-align: center;
}

/* ---- About Page ---- */
.about-page {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}


.theme-button{


  font-family:"JetBrains Mono",monospace;

  font-size:11px;

  letter-spacing:.1em;

  text-transform:uppercase;


  padding:9px 18px;


  border:

  1px solid var(--border-color);


  background:transparent;


  color:var(--text-secondary);


  cursor:pointer;


  transition:.2s;


}



.theme-button:hover{


  border-color:var(--accent);

  color:var(--accent);


}
.noise-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 70px;
  height: 2px;

  outline: none;
  cursor: pointer;
  flex-shrink: 0;

  margin-left:-7px;
}

.noise-slider::-webkit-slider-runnable-track {
  height: 2px;
  background: var(--border-color);
}

.noise-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}

.noise-slider::-moz-range-track {
  height: 2px;
  background: var(--border-color);
}

.noise-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  border: none;
  cursor: pointer;
}



.quick-controls p,
.quantum-statistics p,
.photon-chart p{

    font-family:"Space Grotesk",sans-serif;
    font-weight:600;
    color:var(--text-primary);
    letter-spacing:.04em;
    text-transform:uppercase;
    font-size:13px;

}


.quick-controls label{

    font-family:"JetBrains Mono",monospace;
    color:var(--text-secondary);
    font-size:12px;
    letter-spacing:.08em;

}


button{

  font-family:"JetBrains Mono",monospace;

  color:var(--text-primary);

}


button:not(.theme-button){

  background:var(--accent);
  border-color:var(--accent);
  color:white;

}

.dashboard-header__title{

  font-family:"Orbitron",sans-serif;

  font-size:26px;

  font-weight:700;

  letter-spacing:.08em;

  text-transform:uppercase;

}


.dashboard-header__subtitle{

  font-family:"JetBrains Mono",monospace;

  font-size:11px;

  letter-spacing:.15em;

  color:var(--accent);

  text-transform:uppercase;

}

.quick-controls p,
.quantum-statistics p,
.photon-chart p,
.session-summary p{

  font-family:"Orbitron",sans-serif;

  font-size:12px;

  letter-spacing:.12em;

  text-transform:uppercase;

}

body{

  letter-spacing:.01em;

}


p{

  font-family:"Inter",sans-serif;

}/* ============================================================
   ANIMATIONS — All Keyframes & Transitions
   Only movement and transitions live here.
   ============================================================ */


/* ---------------- BUTTONS ---------------- */

button {
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    opacity var(--transition);
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(1px) scale(0.98);
}


/* ---------------- INPUTS ---------------- */

input,
textarea {
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

textarea:hover,
input:hover {
  transform: translateY(-1px);
}

textarea:focus,
input:focus {
  transform: translateY(-1px);
}


/* ---------------- NAV ---------------- */

.nav-link {
  transition:
    border-color 200ms ease,
    transform 200ms ease,
    opacity 200ms ease;
}

.nav-link:hover {
  transform: translateX(4px);
}


/* ---------------- CHAT ---------------- */

.chat-window__bubble,
.chat-window__system {
  animation: messageAppear 250ms ease;
}


/* ---------------- TIMELINE ---------------- */

.progress-timeline__step {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.progress-timeline__step.active {
  animation: pulseStep 1.6s ease-in-out infinite;
}

.progress-timeline__step.completed {
  animation: popStep 0.35s ease;
}

.progress-timeline__step.failed {
  animation: shakeStep 0.45s ease;
}


/* ============================================================
   KEYFRAMES — General UI
   ============================================================ */

@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseStep {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.02); }
}

@keyframes popStep {
  0%   { transform: scale(0.95); opacity: 0; }
  70%  { transform: scale(1.03); }
  100% { transform: scale(1);    opacity: 1; }
}

@keyframes shakeStep {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-3px); }
  40%  { transform: translateX(3px); }
  60%  { transform: translateX(-2px); }
  80%  { transform: translateX(2px); }
  100% { transform: translateX(0); }
}


/* ============================================================
   BB84 QUANTUM STATE ANIMATION
   - Stage 2 lasts 1800ms, 3 qubits staggered 0.4s apart
   - Each qubit gets 1.4s to fully cross the lane
   - left:0 in components.css is the start anchor;
     we move the element using translateX across the full lane
   - 30vw reliably spans the photon-lane on all screen sizes
   ============================================================ */

.quantum-state {
  animation-duration: 1.4s;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

.quantum--forward {
  animation-name: quantumForward;
}

.quantum--backward {
  animation-name: quantumBackward;
}

@keyframes quantumForward {
  0%   { transform: translateX(0);    opacity: 0; }
  8%   { opacity: 1; }
  100% { transform: translateX(30vw); opacity: 1; }
}

@keyframes quantumBackward {
  0%   { transform: translateX(30vw); opacity: 0; }
  8%   { opacity: 1; }
  100% { transform: translateX(0);    opacity: 1; }
}


/* ============================================================
   BASIS EXCHANGE
   - Stage 4 lasts 1800ms, single element crosses in 1.6s
   ============================================================ */

.basis-message {
  animation-duration: 1.6s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

.basis--forward {
  animation-name: basisForward;
}

.basis--backward {
  animation-name: basisBackward;
}

@keyframes basisForward {
  0%   { transform: translateX(0);    opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateX(30vw); opacity: 1; }
}

@keyframes basisBackward {
  0%   { transform: translateX(30vw); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateX(0);    opacity: 1; }
}


/* ============================================================
   MESSAGE ENCRYPTION
   - Stage 7+ lasts 1800ms, single 🔒 crosses in 1.6s
   ============================================================ */

.message-photon {
  animation-duration: 1.6s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

.message--forward {
  animation-name: messageForward;
}

.message--backward {
  animation-name: messageBackward;
}

@keyframes messageForward {
  0%   { transform: translateX(0);    opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateX(30vw); opacity: 1; }
}

@keyframes messageBackward {
  0%   { transform: translateX(30vw); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateX(0);    opacity: 1; }
}


/* ============================================================
   OTHER UI
   ============================================================ */

@keyframes fadePage {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}/* ============================================================
   RESPONSIVE — All Media Queries
   Nothing else lives here.
   ============================================================ */

/* =============================================================
   Desktop:  >= 1440px  (default styles in other files)
   Laptop:   1024px – 1439px
   Tablet:   768px  – 1023px
   Mobile:   < 768px
   ============================================================= */

/* ---- Laptop ---- */
@media (max-width: 1439px) {
  .main-content {
    padding: var(--space-lg);
    gap: var(--space-lg);
  }

  .panels-row,
  .bottom-row {
    gap: var(--space-lg);
  }
}

/* ---- Tablet: collapse 3-col panels to 1-col, keep sidebar ---- */
@media (max-width: 1023px) {
  .panels-row {
    grid-template-columns: 1fr;
  }

  .bottom-row {
    grid-template-columns: 1fr 1fr;
  }

  .sidebar {
    width: clamp(180px, 24vw, 220px);
  }
}

/* ---- Small tablet / large mobile: sidebar moves to top, full stack ---- */
@media (max-width: 767px) {
  .body {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    border-right: none;
    border-bottom: 1px solid;
  }

  .navbar ul {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .quick-controls {
    flex: 1;
    min-width: 220px;
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }

  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}