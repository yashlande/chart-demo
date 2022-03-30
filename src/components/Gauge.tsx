import React from 'react'
import GaugeChart from "react-gauge-chart";

function Gauge() {
  return (
    <div>
      <GaugeChart id="gauge-chart" textColor="#333" />
      <GaugeChart id="gauge-chart2"
        nrOfLevels={20}
        percent={0.86}
      />
      <GaugeChart id="gauge-chart3"
        nrOfLevels={30}
        colors={["#FF5F6D", "#FFC371"]}
        arcWidth={0.3}
        percent={0.37}
      />
      <GaugeChart id="gauge-chart4"
        nrOfLevels={10}
        arcPadding={0.1}
        cornerRadius={3}
        percent={0.6}
      />

      <GaugeChart id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={['#5BE12C', '#F5CD19', '#EA4228']}
        percent={0.37}
        arcPadding={0.02}
      />
      <GaugeChart id="gauge-chart6"
        animate={false}
        nrOfLevels={15}
        percent={0.56}
        needleColor="#345243"
      />
    </div>
  )
}

export default Gauge