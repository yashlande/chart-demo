import React from "react";
import ApexHeatmap, { ApexHeatmapProps } from "./ApexHeatmap";
import { Meta, Story } from '@storybook/react';

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

const data1 = [
    {
        name: 'W1',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W2',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W3',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W4',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W5',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W6',
        data: generateData(24, {
            min: 0,
            max: 90
        })
    },
]

const data2 = [
    {
        name: "Series 1",
        data: [{
            x: 'W1',
            y: 22
        }, {
            x: 'W2',
            y: 29
        }, {
            x: 'W3',
            y: 13
        }, {
            x: 'W4',
            y: 32
        }]
    },
    {
        name: "Series 2",
        data: [{
            x: 'W1',
            y: 43
        }, {
            x: 'W2',
            y: 43
        }, {
            x: 'W3',
            y: 43
        }, {
            x: 'W4',
            y: 43
        }]
    }
]

const data3 = [
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


const colors = ["#E62B47", "#FF6E84", "#FFCBD3"]

const xLabels = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'];

export default {
    title: 'Charts/ApexHeatmap',
    component: ApexHeatmap,
} as Meta;


const Template: Story<ApexHeatmapProps> = (args) => <ApexHeatmap {...args} />

export const Default = Template.bind({});

Default.args = {
    chartSize: {
        width: 800,
        height: 300
    },
    // colors,
    data: data3,
    xLabels,
    showToolbar: false,
    
    rangeColors: [{
        from: -30,
        to: 33,
        color: colors[2],
        name: 'Low',
    },
    {
        from: 33,
        to: 66,
        color: colors[1],
        name: 'Medium',
    },
    {
        from: 66,
        to: 100,
        color: colors[0],
        name: 'High',
    }
    ]
}