import { Meta, Story } from '@storybook/react';
// import GaugeChart, { GaugeChartProps } from './gaugechrt';
import GridHeatmap, { HeatmapProps } from './GridHeatmap';

const xLabels = new Array(8).fill(0).map((_, i) => `${i}`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const colors = ['163, 1, 1', '244, 40, 40', '247, 162, 162']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  )

export default {
  title: 'Charts/GridHeatmap',
  component: GridHeatmap,
} as Meta;

const Template: Story<HeatmapProps> = (args) => <GridHeatmap {...args} />;

export const Default = Template.bind({});
Default.args = {
  // size: '50',
  colors: [
    {
      name: 'Test 1', color_code: '#E62B47'
    },
    {
      name: 'Test 2', color_code: '#FF6E84'
    },
    {
      name: 'Test 3', color_code: '#FFCBD3'
    }
  ],
  data,
  xLabels,
  yLabels,
  cellSize: {
    width: '48.4px',
    height: '30.8px'
  }
};

