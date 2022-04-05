import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'
import './GridHeatmap.css'


export interface HeatmapProps {
    size?: string;
    colors?: Array<string>;
    data?: Array<Array<Number>> | any;
    xLabels?: Array<string | any>;
    yLabels?: Array<string | any>;
}


// const xLabels = new Array(12).fill(0).map((_, i) => `${i}`)
// const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
// const colors = ['163, 1, 1', '244, 40, 40', '247, 162, 162']
// const data = new Array(yLabels.length)
//     .fill(0)
//     .map(() =>
//         new Array(xLabels.length)
//             .fill(0)
//             .map(() => Math.floor(Math.random() * 50 + 50))
//     )

// ,width:'13px',height:'13px',borderRadius:'20%'

const colorItem={
    width:'13.2px',
    height:'13.2px',
    borderRadius:'3.51971px',
    marginLeft:'5px'
}

const colorPlates = (colors: Array<string>) => {
    return (
        <>
            <div className="colorPlate">
                {
                    colors.map((item, index) => {
                        return (
                            <>
                                <div style={{...colorItem, backgroundColor:`rgb(${item})`}}>
                                </div>
                                <p>Test {(index+1)}</p>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}


const GridHeatmap = ({ size, colors = ['163, 1, 1', '244, 40, 40', '247, 162, 162'], data, xLabels, yLabels }: HeatmapProps) => {
    return (
        <div
            style={{
                width: `${size}vw`
            }}
        >
            {colorPlates(colors)}
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
                    background: ratio > 0.66 ? `rgb(${colors[0]})` : ratio > 0.33 ? `rgb(${colors[1]})` : `rgb(${colors[2]})`,
                    // background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: '.8rem',
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
                    borderRadius: 0
                })}
                cellHeight='2rem'
                xLabelsPos='bottom'
                // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
                yLabelsPos='left'
            // square
            />
        </div>
    )
}

export default GridHeatmap