import React from 'react'
import './Loader.css'
import Load from '../utils/Loader.svg'

function Loader() {
  return (
    <div className='load'>
      <center>
        <img src={Load} alt="" />
      </center>
    </div>
  )
}


export default Loader
