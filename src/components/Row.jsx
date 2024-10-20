import React, { useState } from 'react'
import Piece from './Piece'
import chesspieces from '../assets/chesspieces'
import Square from './Square'
export default function Row({rowNum}) {



    const alpahbets=['a','b','c','d','e','f','g','h']

    function handleColor(){

    }
  return (

    <div className='flex flex-row '>
{alpahbets.map((a)=>(
 ( <Square   col={a} rowNum={rowNum} />))
)

}

    </div>
  )
}
