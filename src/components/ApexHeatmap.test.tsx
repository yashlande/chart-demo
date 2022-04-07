import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ApexHeatmap from "./ApexHeatmap";

const data2 = [
    {
        name: "Series 1", data: [{ x: 'W1', y: 22 }, { x: 'W2', y: 29 }, { x: 'W3', y: 13 }, { x: 'W4', y: 32 }]
    },
    {
        name: "Series 2", data: [{ x: 'W1', y: 43 }, { x: 'W2', y: 43 }, { x: 'W3', y: 43 }, { x: 'W4', y: 43 }]
    }
]

const size = {
    width: 800,
    height: 300
}

const xLabels = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'];

const colors = ["#E62B47", "#FF6E84", "#FFCBD3"]

const rangeColors= [{
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

describe('The HeatMapGrid component', () => {
    it('should render properly with all its attributes provided', () => {
        render(<ApexHeatmap
            size={size}
            data={data2}
            xLabels={xLabels}
            showToolbar={false}
            rangeColors={rangeColors}
        />)
        expect(screen.getByText('Series 1')).toBeInTheDocument()
    })
})