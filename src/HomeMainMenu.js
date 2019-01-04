import React, { Fragment } from 'react'

const HomeMainMenu = (props) => {
        return(
          <Fragment>
                <div className="home-buttons">
                  <button onClick={props.userLocation} className="home-button user-location">Current Location</button>
                  <span>or</span>
                  <button onClick={props.activateCitySearch} className="home-button user-city">Your City</button>
                </div>
          </Fragment>
        )
  }

export default HomeMainMenu
