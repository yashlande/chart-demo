import React, { useState } from 'react'
import Chart from 'react-apexcharts'

function ApexHeatmap() {

    function generateData(count: Number, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = (i + 1).toString();
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }

    var data = [
        {
            name: 'W1',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'W2',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'W3',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'W4',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'W5',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'W6',
            data: generateData(8, {
                min: 0,
                max: 90
            })
        },
    ]

    data.reverse()

    var colors = ["#E62B47","#FF6E84","#FFCBD3"]

    // colors.reverse()

    const [state, setState] = useState({
        series: data,
        options: {
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
                categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30']
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
            <Chart options={state.options} series={state.series} type="heatmap" width={800} height={300}/>
        </div>
    )
}

export default ApexHeatmap