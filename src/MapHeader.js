import React from 'react'
import { Link } from 'react-router-dom'


function MapHeader(props){
  return(
    <div className="map-heading">
      <Link to="/" className="home">
        <p><i className="fas fa-arrow-circle-left"></i><span>Return to menu</span></p>
      </Link>
      <h1>Hello<i className="fas fa-coffee"></i>Cafés</h1>
    </div>
  )
}

export default MapHeader
