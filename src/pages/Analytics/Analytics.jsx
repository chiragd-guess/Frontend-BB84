import { useOutletContext } from "react-router-dom";

import {
  SecurityIndexCard,
  QberGaugeCard,
  KeyRateCard,
  QberVsThresholdCard,
  PhotonFunnelCard,
  LossBreakdownCard,
  BasisMatchingPie,
  EveConfidenceCard,
} from "../../components/Analytics/AnalyticsWidgets";

export default function Analytics() {
  const { simulation } = useOutletContext();

  const api = simulation?.apiResult;
  const hasRun = Boolean(api);

  const qber = api?.statistics.qber ?? 0;
  const threshold = api?.security.threshold ?? 11;
  const secure = api?.security.secure ?? false;
  const sent = api?.statistics.photons_sent ?? 0;
  const received = api?.statistics.photons_received ?? 0;
  const matchingBases = api?.statistics.matching_bases ?? 0;
  const finalKeyLength = api?.statistics.final_key_length ?? 0;
  const photonsLost = api?.statistics.photons_lost ?? 0;
  const detectorMissed = api?.statistics.detector_missed ?? 0;
  const darkCounts = api?.statistics.dark_counts ?? 0;
  const noiseEvents = api?.statistics.noise_events ?? 0;

  return (
    <div className="analytics-page">
      <section className="an-intro">
        <h2>Session Analytics</h2>
        <p>
          Live quantum-channel diagnostics for this session — security index, QBER, key rate,
          and eavesdropper-detection confidence, all derived from your simulation runs.
        </p>
      </section>

      <section className="an-grid-3">
        <SecurityIndexCard qber={qber} secure={secure} hasRun={hasRun} />
        <QberGaugeCard qber={qber} threshold={threshold} hasRun={hasRun} />
        <KeyRateCard finalKeyLength={finalKeyLength} photonsSent={sent} hasRun={hasRun} />
      </section>

      <section className="an-grid-3">
        <QberVsThresholdCard qber={qber} threshold={threshold} hasRun={hasRun} />
        <PhotonFunnelCard
          sent={sent}
          received={received}
          matchingBases={matchingBases}
          finalKeyLength={finalKeyLength}
          hasRun={hasRun}
        />
        <LossBreakdownCard
          sent={sent}
          photonsLost={photonsLost}
          detectorMissed={detectorMissed}
          darkCounts={darkCounts}
          noiseEvents={noiseEvents}
          hasRun={hasRun}
        />
      </section>

      <section className="an-grid-2">
        <BasisMatchingPie matchingBases={matchingBases} received={received} hasRun={hasRun} />
        <EveConfidenceCard
          qber={qber}
          threshold={threshold}
          sampleSize={matchingBases}
          hasRun={hasRun}
        />
      </section>
    </div>
  );
}