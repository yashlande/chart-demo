import { useState } from 'react'
import Gauge from './components/Gauge'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Gauge/>
    </div>
  )
}

export default App
