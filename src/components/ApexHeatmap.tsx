import React, { useState } from 'react'
import Chart from 'react-apexcharts'

export interface ApexHeatmapProps {
    chartSize?: {
        width: number,
        height: number
    };
    colors?: Array<string>;
    data?: Array<Array<Number>> | any;
    xLabels?: Array<string | any>;
}

function ApexHeatmap({ chartSize, colors=["#E62B47", "#FF6E84", "#FFCBD3"], data, xLabels }: ApexHeatmapProps) {

    const [state, setState] = useState({
        series: data,
        options: {
            plotOptions: {
                heatmap: {
                    colorScale: {
                        ranges: [{
                            from: -30,
                            to: 33,
                            color: colors[2],
                            name: 'low',
                        },
                        {
                            from: 33,
                            to: 66,
                            color: colors[1],
                            name: 'medium',
                        },
                        {
                            from: 66,
                            to: 100,
                            color: colors[0],
                            name: 'high',
                        }
                        ]
                    }
                }
            },
            chart: {
                // height: 450,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: colors,
            xaxis: {
                type: 'category',
                categories: xLabels
            },
            title: {
                // text: 'HeatMap Chart (Different color shades for each series)'
            },
            grid: {
                padding: {
                    right: 20
                }
            }
        },
    })
    return (
        <div>
            <Chart options={state.options} series={state.series} type="heatmap" width={chartSize?.width} height={chartSize?.height} />
        </div>
    )
}

export default ApexHeatmap