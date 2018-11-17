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
            <p>Where are you?</p>
            <input className="search-café" placeholder="Enter your location"/>
            <Link to={this.checkCafes()} className="search-input"><i className="fas fa-search"></i></Link>
        </div>

      )
    }
}

export default Home
