import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts'
import styled from 'styled-components';
import './ApexHeatmap.css'

interface rangeColor {
    from: number;
    to: number;
    color: string;
    name: string;
}

export interface ApexHeatmapProps {
    size: {
        width: number | string,
        height: number | string
    };
    showToolbar?: boolean;
    data: Array<Array<Number>> | any;
    xLabels: Array<string | any>;
    rangeColors:Array<rangeColor>;
}

const Legend=styled(Box)`
    background-color: ${(props:any)=>props.bgcolor};
`

const colorPlates = (colors: Array<rangeColor>) => {
    return (
        <>
            <Box className="apex__legendContainer">
                {
                    colors.map((item) => {
                        return (
                            <>
                                <Legend className='apex__legendItem' bgcolor={item.color}>
                                </Legend>
                                <Typography variant='subtitle2'>{item.name}</Typography>
                            </>
                        )
                    })
                }
            </Box>
        </>
    )
}


function ApexHeatmap({ size, data, xLabels, showToolbar, rangeColors }: ApexHeatmapProps) {

    const configure={
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
                toolbar: {
                    show: showToolbar,
                    offsetX: 0,
                    offsetY: 0,
                }
            },
            legend:{
                show:false,
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: xLabels
            },
            grid: {
                padding: {
                    right: 20
                }
            }
        },
    }
    return (
        <Box>
            {colorPlates(rangeColors!)}
            <Chart options={configure.options} series={configure.series} type="heatmap" width={size?.width} height={size?.height} />
        </Box>
    )
}

export default ApexHeatmap