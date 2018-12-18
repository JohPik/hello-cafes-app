import React, { Component, Fragment } from 'react'

class HomeMainMenu extends Component {

    render(){
        return(
          <Fragment>
                <div className="home-buttons">
                  <button onClick={this.props.userLocation} className="home-button user-location">Current Location</button>
                  <span>or</span>
                  <button onClick={this.props.activateCitySearch} className="home-button user-city">Your City</button>
                </div>
          </Fragment>
        )
    }
  }

export default HomeMainMenu
