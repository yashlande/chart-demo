import { useState } from 'react'
import './App.css'
import ApexHeatmap from './components/ApexHeatmap'
// import CanvasChart from './components/CanvasChart'
// import GridHeatmap from './components/GridHeatmap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <CanvasChart /> */}
      {/* <Hitmap/> */}
      <ApexHeatmap />
    </div>
  )
}

export default App
