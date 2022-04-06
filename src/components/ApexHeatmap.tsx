import React, { useState } from 'react'
import Chart from 'react-apexcharts'

interface rangeColor {
    from: number;
    to: number;
    color: string;
    name: string;
}

export interface ApexHeatmapProps {
    chartSize?: {
        width: number,
        height: number
    };
    showToolbar: boolean;
    colors?: Array<string>;
    data?: Array<Array<Number>> | any;
    xLabels?: Array<string | any>;
    rangeColors?:Array<rangeColor>;
}

function ApexHeatmap({ chartSize, colors = ["#E62B47", "#FF6E84", "#FFCBD3"], data, xLabels, showToolbar, rangeColors }: ApexHeatmapProps) {

    const [state, setState] = useState({
        series: data,
        options: {
            plotOptions: {
                heatmap: {
                    colorScale: {
                        ranges: rangeColors
                    }
                }
            },
            chart: {
                // height: 450,
                type: 'heatmap',
                toolbar: {
                    show: showToolbar,
                    offsetX: 0,
                    offsetY: 0,
                }
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