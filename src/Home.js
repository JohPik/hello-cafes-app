import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

    render(){
      return (
        <div className="home-main">
            <p>Where are you?</p>
            <input className="search-café" placeholder="Enter your location"/>
            <Link to="/map" className="search-input"><i className="fas fa-search"></i></Link>
        </div>

      )
    }
}

export default Home
