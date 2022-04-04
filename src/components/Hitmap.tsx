import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'


export interface HitmapProps {
    size?: string;
    colors?: Array<string>;
    data?: Array<Array<Number>>;
    xLabels?: Array<string | any>;
    yLabels?: Array<string | any>;
}


const xLabels = new Array(12).fill(0).map((_, i) => `${i}`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
        new Array(xLabels.length)
            .fill(0)
            .map(() => Math.floor(Math.random() * 50 + 50))
    )

console.log("Data =", data)

const Hitmap = () => {
    return (
        <div
            style={{
                width: '50vw'
            }}
        >
            <HeatMapGrid
                data={data}
                xLabels={xLabels}
                yLabels={yLabels}
                // Reder cell with tooltip
                // cellRender={(x, y, value) => (
                //   <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
                // )}
                xLabelsStyle={(index) => ({
                    //   color: index % 2 ? 'transparent' : '#777',
                    color: 'black',
                    fontSize: '.8rem'
                })}
                yLabelsStyle={() => ({
                    fontSize: '.7rem',
                    textTransform: 'uppercase',
                    color: 'black',
                    marginRight: '5px'
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: '.8rem',
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                })}
                cellHeight='2rem'
                xLabelsPos='bottom'
                onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
                yLabelsPos='left'
            // square
            />
        </div>
    )
}

export default Hitmap