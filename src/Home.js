import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    checkCafes = () => {
      if (this.props.allCafes.length < 1) {
        let url = "/"
        return url
      } else {
        let url = "/map"
        return url
      }
    }

    render(){
      return (
        <div className="home-main">
            <h2 className="home-heading">Where are you?</h2>
            <input className="search-café" placeholder="Enter your location"/>
            <Link to={this.checkCafes()} className="search-input"><i className="fas fa-search"></i></Link>
            <p className="cafes-numbers">We found <span>{this.props.shownMarker.length}</span> cafés</p>
        </div>

      )
    }
}

export default Home
