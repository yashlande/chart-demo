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
                                <div style={{...colorItem, backgroundColor:`${item}`}}>
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
                    background: ratio > 0.66 ? `${colors[0]}` : ratio > 0.33 ? `${colors[1]}` : `${colors[2]}`,
                    fontSize: '.8rem',
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
                    borderRadius: 0,
                    // margin: '2.63978px 0px',
                    width:'48.4px',
                    height:'30.8px'

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