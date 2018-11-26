import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {
    citySearch : false
  }

  ActivateCitySearch = () => {
    this.setState({ citySearch : true })
    console.log(this.state);
  }
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

        { !this.state.citySearch ? (
          <Fragment>
            <h2 className="home-heading">Search Cafés from your</h2>
            <div className="home-buttons">
              <button onClick={this.props.userLocation} className="home-buttons">Near You</button>
              <span>or</span>
              <button onClick={this.ActivateCitySearch} className="home-buttons">City</button>
            </div>
          </Fragment>
        )

          : (
            <Fragment>
              <h2 className="home-heading">Search Cafés from your</h2>
              <input className="search-café" placeholder="Enter your location"/>
              <Link to={this.checkCafes()} className="search-input"><i className="fas fa-search"></i></Link>
              <p className="cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés</p>
            </Fragment>
          )
        }

        </div>
        )
    }
}

export default Home
