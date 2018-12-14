import React, { Component, Fragment } from 'react'


class Home extends Component {

    // checkCafes = () => {
    //   if (this.props.allCafes.length < 1) {
    //     let url = "/"
    //     return url
    //   } else {
    //     let url = "/map"
    //     return url
    //   }
    // }

    render(){
      return (
        <div className="home-main">

        { !this.props.citySearch ?

          /**** Using Current Location ***/
            !this.props.curentLocation ?
            (<Fragment>
                <div className="home-buttons">
                  <button onClick={this.props.userLocation} className="home-button user-location">Current Location</button>
                  <span>or</span>
                  <button onClick={this.props.activateCitySearch} className="home-button user-city">Your City</button>
                </div>
              </Fragment>)
            :
              !this.props.activeMarkers.length > 0 ?
                (<span>Currently Searching, Please Wait.</span>)
                :
                (<Fragment></Fragment>)

          :

          /**** Using Input Search City ***/
          (
            <Fragment>
              <i className="fas fa-arrow-circle-left" onClick={() => this.props.deActivateCitySearch()}>Previous</i>
              <input className="search-café" placeholder="Enter your location"/>
            </Fragment>
          )
        }

        </div>
        )
    }
}

export default Home
