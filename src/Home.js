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
            <div className="home-buttons">
              <button onClick={this.props.userLocation} className="home-buttons">Near You</button>
              <span>or</span>
              <button onClick={this.ActivateCitySearch} className="home-buttons">City</button>
            </div>
          </Fragment>
        )

          : (
            <Fragment>
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
