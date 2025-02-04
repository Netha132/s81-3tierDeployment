import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='homePage'>
      <img src="/images/eclipseSpirits.png" alt="Vera Vogue Logo" className="backgroundImage" />
      <div className="buttonContainer">
        <Link className="overlayButton" to="/login"> Register</Link>
        </div>
    </div>
  )
}

export default Home
