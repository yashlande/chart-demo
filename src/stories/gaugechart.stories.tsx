import React from 'react';
import { Meta, Story } from '@storybook/react';
import GaugeChart, { GaugeChartProps } from '../components/gaugechrt';

export default {
  title: 'Charts/GaugeChart',
  component: GaugeChart,
} as Meta;

const Template: Story<GaugeChartProps> = (args) => <GaugeChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  needleValue: 50,
  needleColor: '#003264',
  needleLength: 20,
  //   colors: ['green', 'orange', 'red'],
};

export const ColorGaugeChart = Template.bind({});
ColorGaugeChart.args = {
  needleValue: 50,
  needleColor: '#800080',
  needleLength: 40,
  colors: ['pink', '#BA55D3', '#663399'],
};
