import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'
import './GridHeatmap.css'
import { Typography } from '@mui/material';

interface color {
    name?: string,
    color_code?: string
}

export interface HeatmapProps {
    size?: string;
    // colors?: Array<string>;
    colors?: Array<color>;
    data?: Array<Array<Number>> | any;
    xLabels?: Array<string | any>;
    yLabels?: Array<string | any>;
    cellSize: {
        width: string,
        height: string
    };
}


const colorItem = {
    width: '13.2px',
    height: '13.2px',
    borderRadius: '3.51971px',
    marginLeft: '5px'
}

const ColorPlates = ({ colors }) => {
    return (
        <>
            <div className="colorPlate">
                {
                    colors.map((item, index) => {
                        return (
                            <>
                                <div style={{ ...colorItem, backgroundColor: `${item.color_code}` }}>
                                </div>
                                <Typography variant='subtitle2'>{item.name}</Typography>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

const defaultColors = [
    {
        name: 'Test 1', color_code: '#E62B47'
    },
    {
        name: 'Test 2', color_code: '#FF6E84'
    },
    {
        name: 'Test 3', color_code: '#FFCBD3'
    }
]


const GridHeatmap = ({ colors = defaultColors, data, xLabels, yLabels, cellSize }: HeatmapProps) => {
    return (
        <div
            style={{
                // width: `${size}vw`
                width: 'max-content'
            }}
        >
            {/* {colorPlates(colors)} */}
            <ColorPlates colors={colors} />
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
                    background: ratio > 0.66 ? `${colors[0].color_code}` : ratio > 0.33 ? `${colors[1].color_code}` : `${colors[2].color_code}`,
                    borderRadius: 0,
                    // margin: '2.63978px 0px',
                    width: cellSize.width,
                    height: cellSize.height,

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