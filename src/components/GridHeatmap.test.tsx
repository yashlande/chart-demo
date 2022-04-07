import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import GridHeatmap from './GridHeatmap'

const xLabels = new Array(10).fill(0).map((_, i) => `${i}Hr`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * Math.random() * 200))
  )

const cellSize = {
  width: '48.4px',
  height: '30.8px'
}

const colors= [
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

describe('The HeatMapGrid component', () => {
  it('should render properly with all its attributes provided', () => {
    render(
      <GridHeatmap
        colors={colors}
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellSize={cellSize}
      />
    )
    expect(screen.getByText('Sun')).toBeInTheDocument()
  })
})
