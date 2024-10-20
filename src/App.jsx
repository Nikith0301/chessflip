import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Board from './components/Board'
import Piece from './components/Piece'
import chesspieces from './assets/chesspieces.jsx'

function App() {


  return (
    <>
  <div className="p-0 h-screen w-screen bg-slate-600">
  <Board/>
 
  </div>
   
    </>
  )
}

export default App
