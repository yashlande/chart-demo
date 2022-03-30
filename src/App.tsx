import { useState } from 'react'
import './App.css'
import CanvasChart from './components/CanvasChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CanvasChart />
    </div>
  )
}

export default App
