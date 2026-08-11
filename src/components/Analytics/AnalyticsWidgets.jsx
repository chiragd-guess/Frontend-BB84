import React from "react";

/* ---------- shared helpers ---------- */

function erf(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y =
    1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);
  return sign * y;
}
function normalCDF(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// One-sided confidence, given the observed QBER on `sampleSize` sifted bits,
// that the true error rate exceeds the security threshold.
export function detectionConfidence(qberPct, thresholdPct, sampleSize) {
  if (!sampleSize || sampleSize <= 0) return null;
  const p0 = thresholdPct / 100;
  const pObs = qberPct / 100;
  const se = Math.sqrt((p0 * (1 - p0)) / sampleSize);
  if (!se) return null;
  const z = (pObs - p0) / se;
  return Math.min(99.9, Math.max(0.1, normalCDF(z) * 100));
}

export function zoneColor(qber, threshold) {
  if (qber <= threshold * 0.45) return "var(--success)";
  if (qber <= threshold) return "var(--warning-text)";
  return "var(--danger)";
}

/* ---------- Security Index ---------- */

export function SecurityIndexCard({ qber, secure, hasRun }) {
  const score = hasRun
    ? Math.max(0, Math.round(100 - qber * 3 - (secure ? 0 : 15)))
    : null;
  const color = hasRun ? zoneColor(qber, 11) : "var(--text-secondary)";

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Quantum Security Index</p>
        <span className="an-info-dot" title="Composite score from QBER and channel status">
          i
        </span>
      </div>
      <div className="an-sec-body">
        <svg viewBox="0 0 58 58" width="52" height="52">
          <path
            d="M29 5 48 12v13c0 13-8 21.5-19 26C18 46.5 10 38 10 25V12L29 5Z"
            fill={hasRun ? `color-mix(in srgb, ${color} 14%, transparent)` : "transparent"}
            stroke={color}
            strokeWidth="1.6"
          />
          <path
            d="M29 22v10M29 36.2v.1"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <div className="an-sec-info">
          <p className="an-sec-num">
            {hasRun ? score : "—"}
            <span>/100</span>
          </p>
          <p className="an-sec-caption">
            {hasRun
              ? secure
                ? "Low QBER · channel secure"
                : "High QBER · possible interception"
              : "Run a simulation to compute a security score"}
          </p>
          <div className="an-sec-bar-track">
            <div
              className="an-sec-bar-fill"
              style={{ width: `${hasRun ? score : 0}%`, background: color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- QBER vertical gauge ---------- */

export function QberGaugeCard({ qber, threshold, hasRun }) {
  const color = hasRun ? zoneColor(qber, threshold) : "var(--text-secondary)";
  const zoneLabel = !hasRun
    ? "—"
    : qber <= threshold * 0.45
    ? "SAFE ZONE"
    : qber <= threshold
    ? "CAUTION ZONE"
    : "RED ZONE";
  const max = Math.max(25, threshold * 2);
  const fillPct = hasRun ? Math.min(100, (qber / max) * 100) : 0;

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">QBER</p>
        <span className={`an-status-tag ${hasRun ? "" : "an-status-tag--dim"}`} style={{ color, borderColor: color }}>
          {zoneLabel}
        </span>
      </div>
      <div className="an-vgauge-body">
        <div className="an-vgauge-ticks">
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>
        <div className="an-vgauge-track">
          <div
            className="an-vgauge-fill"
            style={{ height: `${fillPct}%`, background: color }}
          />
        </div>
        <div className="an-vgauge-info">
          <p className="an-vgauge-value" style={{ color }}>
            {hasRun ? `${qber.toFixed(2)}%` : "—"}
          </p>
          <p className="an-vgauge-sub">
            {hasRun ? (qber <= threshold ? "Channel secure" : "Channel compromised") : "No runs yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Key Rate vertical gauge ---------- */

export function KeyRateCard({ finalKeyLength, photonsSent, hasRun }) {
  const pct = hasRun && photonsSent ? Math.min(100, (finalKeyLength / photonsSent) * 100) : 0;

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Key Rate</p>
        <span className="an-info-dot" title="Final secure key length vs. photons sent">
          i
        </span>
      </div>
      <div className="an-vgauge-body">
        <div className="an-vgauge-ticks">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>
        <div className="an-vgauge-track">
          <div
            className="an-vgauge-fill an-vgauge-fill--accent"
            style={{ height: `${pct}%` }}
          />
        </div>
        <div className="an-vgauge-info">
          <p className="an-vgauge-value">{hasRun ? `${Math.round(pct)}%` : "—"}</p>
          <p className="an-vgauge-sub">
            {hasRun ? `${finalKeyLength} / ${photonsSent} bits` : "No runs yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- QBER vs Threshold bar (replaces multi-run timeline — no history kept) ---------- */

export function QberVsThresholdCard({ qber, threshold, hasRun }) {
  const max = Math.max(25, threshold * 2);
  const qberPct = hasRun ? Math.min(100, (qber / max) * 100) : 0;
  const thresholdPct = Math.min(100, (threshold / max) * 100);
  const color = hasRun ? zoneColor(qber, threshold) : "var(--text-secondary)";

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">QBER vs Threshold</p>
        <span className="an-info-dot" title="This run's QBER against the security abort threshold">
          i
        </span>
      </div>
      {hasRun ? (
        <>
          <div className="an-hbar-track">
            <div className="an-hbar-fill" style={{ width: `${qberPct}%`, background: color }} />
            <div className="an-hbar-threshold" style={{ left: `${thresholdPct}%` }} />
          </div>
          <div className="an-hbar-labels">
            <span>0%</span>
            <span className="an-hbar-threshold-label" style={{ left: `${thresholdPct}%` }}>
              {threshold}% threshold
            </span>
            <span>{max}%</span>
          </div>
          <p className="an-hbar-caption" style={{ color }}>
            {qber.toFixed(2)}% observed — {qber <= threshold ? "within limits" : "over threshold"}
          </p>
        </>
      ) : (
        <div className="an-empty">No simulation runs yet this session.</div>
      )}
    </div>
  );
}

/* ---------- Photon Transmission Funnel ---------- */

export function PhotonFunnelCard({ sent, received, matchingBases, finalKeyLength, hasRun }) {
  const rows = hasRun
    ? [
        { label: "Sent", value: sent, pct: 100, color: "var(--accent)" },
        {
          label: "Received",
          value: received,
          pct: sent ? (received / sent) * 100 : 0,
          color: "var(--accent-hover)",
        },
        {
          label: "Matching Bases",
          value: matchingBases,
          pct: sent ? (matchingBases / sent) * 100 : 0,
          color: "var(--warning-text)",
        },
        {
          label: "Final Key",
          value: finalKeyLength,
          pct: sent ? Math.max(finalKeyLength ? 1 : 0, (finalKeyLength / sent) * 100) : 0,
          color: "var(--success)",
        },
      ]
    : [];

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Photon Transmission Funnel</p>
        <span className="an-info-dot" title="Where photons are lost between sending and a secure key">
          i
        </span>
      </div>
      {hasRun ? (
        <div className="an-funnel-list">
          {rows.map((r) => (
            <div className="an-funnel-row" key={r.label}>
              <div className="an-funnel-label-row">
                <span className="an-funnel-label">
                  <span className="an-funnel-dot" style={{ background: r.color }} />
                  {r.label}
                </span>
                <span className="an-funnel-value">{r.value}</span>
              </div>
              <div className="an-funnel-bar-track">
                <div
                  className="an-funnel-bar-fill"
                  style={{ width: `${r.pct}%`, background: r.color }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="an-empty">No simulation runs yet this session.</div>
      )}
    </div>
  );
}

/* ---------- Signal Loss Breakdown (replaces Eve theoretical curve) ---------- */

export function LossBreakdownCard({ sent, photonsLost, detectorMissed, darkCounts, noiseEvents, hasRun }) {
  const rows = hasRun
    ? [
        { label: "Channel Loss", value: photonsLost, color: "var(--danger)" },

        { label: "Noise Events", value: noiseEvents, color: "var(--accent)" },
      ]
    : [];
  const maxVal = Math.max(1, ...rows.map((r) => r.value));

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Signal Loss Breakdown</p>
        <span className="an-info-dot" title="Why photons never made it into the final key">
          i
        </span>
      </div>
      {hasRun ? (
        <div className="an-funnel-list">
          {rows.map((r) => (
            <div className="an-funnel-row" key={r.label}>
              <div className="an-funnel-label-row">
                <span className="an-funnel-label">
                  <span className="an-funnel-dot" style={{ background: r.color }} />
                  {r.label}
                </span>
                <span className="an-funnel-value">{r.value}</span>
              </div>
              <div className="an-funnel-bar-track">
                <div
                  className="an-funnel-bar-fill"
                  style={{ width: `${(r.value / maxVal) * 100}%`, background: r.color }}
                />
              </div>
            </div>
          ))}
          <p className="an-chart-caption">
            Out of {sent} photons sent, this shows every way one could be lost before reaching a usable key bit.
          </p>
        </div>
      ) : (
        <div className="an-empty">No simulation runs yet this session.</div>
      )}
    </div>
  );
}

/* ---------- Basis Matching pie ---------- */

export function BasisMatchingPie({ matchingBases, received, hasRun }) {
  const matchPct = hasRun && received ? (matchingBases / received) * 100 : 0;
  const discarded = hasRun ? Math.max(0, received - matchingBases) : 0;
  const deg = (matchPct / 100) * 360;

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Basis Matching</p>
        <span className="an-info-dot" title="Share of received photons where Alice's and Bob's bases matched">
          i
        </span>
      </div>
      {hasRun ? (
        <div className="an-pie-body">
          <div
            className="an-pie"
            style={{
              background: `conic-gradient(var(--accent) 0deg ${deg}deg, var(--border-color) ${deg}deg 360deg)`,
            }}
          >
            <div className="an-pie-center">
              <b>{matchPct.toFixed(1)}%</b>
              <span>MATCHED</span>
            </div>
          </div>
          <div>
            <div className="an-pie-legend">
              <div className="an-pie-legend-item">
                <span className="an-legend-swatch" style={{ background: "var(--accent)" }} />
                <b>{matchingBases}</b> Matching
              </div>
              <div className="an-pie-legend-item">
                <span className="an-legend-swatch" style={{ background: "var(--border-color)" }} />
                <b>{discarded}</b> Discarded
              </div>
            </div>
            <p className="an-pie-desc">
              Environmental noise causes small degradation.
              <br />
              Eavesdropping creates detectable quantum disturbance.
            </p>
          </div>
        </div>
      ) : (
        <div className="an-empty">No simulation runs yet this session.</div>
      )}
    </div>
  );
}

/* ---------- Eve Detection Confidence ---------- */

export function EveConfidenceCard({ qber, threshold, sampleSize, hasRun }) {
  const confidence = hasRun ? detectionConfidence(qber, threshold, sampleSize) : null;
  const cx = 65,
    cy = 74,
    r = 57;
  const pct = confidence || 0;
  const angle = 180 - (Math.min(100, pct) / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const x = (cx + r * Math.cos(rad)).toFixed(2);
  const y = (cy - r * Math.sin(rad)).toFixed(2);

  return (
    <div className="an-card">
      <div className="an-card-head">
        <p className="an-card-title">Eve Detection Confidence</p>
        <span
          className="an-info-dot"
          title="Statistical confidence, from this run's QBER vs. the security threshold, that the channel is compromised"
        >
          i
        </span>
      </div>
      {hasRun ? (
        <div className="an-conf-body">
          <div className="an-gauge-wrap">
            <svg viewBox="0 0 130 78" width="120" height="72">
              <path d="M8 74 A57 57 0 0 1 122 74" fill="none" stroke="var(--border-color)" strokeWidth="10" strokeLinecap="round" />
              <path
                d={`M8 74 A${r} ${r} 0 0 1 ${x} ${y}`}
                fill="none"
                stroke="var(--danger)"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
            <div className="an-gauge-center">
              <p className="an-gauge-num">{confidence != null ? `${confidence.toFixed(1)}%` : "—"}</p>
              <p className="an-gauge-cap">confidence</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="an-empty">Run a simulation to build a confidence reading.</div>
      )}
    </div>
  );
}