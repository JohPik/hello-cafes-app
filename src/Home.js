import React, { Component, Fragment } from 'react'
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

        { !this.props.citySearch ? (
          <Fragment>
            <div className="home-buttons">
              <button onClick={this.props.userLocation} className="home-button user-location">Current Location</button>
              <span>or</span>
              <button onClick={this.props.activateCitySearch} className="home-button user-city">Your City</button>
            </div>
          </Fragment>
        )

          : (
            <Fragment>
              <i className="fas fa-arrow-circle-left" onClick={() => this.props.deActivateCitySearch()}></i>
              <input className="search-café" placeholder="Enter your location"/>
              <Link to={this.checkCafes()} className="search-input"><i className="fas fa-search"></i></Link>
            </Fragment>
          )
        }

        </div>
        )
    }
}

export default Home
