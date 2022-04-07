import { HeatMapGrid } from 'react-grid-heatmap'
import './GridHeatmap.css'
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

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

const ColorPlates = ({ colors }: Array<color> | any) => {
    return (
        <>
            <Box className="grid__legendContainer">
                {
                    colors.map((item: any) => {
                        return (
                            <>
                                <Box className='grid__legendItem' style={{ backgroundColor: `${item.color_code}` }}>
                                </Box>
                                <Typography variant='subtitle2'>{item.name}</Typography>
                            </>
                        )
                    })
                }
            </Box>
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
        <Box className='grid__chartContainer'>
            <ColorPlates colors={colors} />
            <HeatMapGrid
                data={data}
                xLabels={xLabels}
                yLabels={yLabels}

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
                    width: cellSize.width,
                    height: cellSize.height,

                })}
                cellHeight='2rem'
                xLabelsPos='bottom'
                yLabelsPos='left'
            />
        </Box>
    )
}

export default GridHeatmap