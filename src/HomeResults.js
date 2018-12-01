import React, { Component, Fragment } from 'react'

class HomeResults extends Component {

    render(){
        return(
          <Fragment>
            <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés</p>
          </Fragment>
        )
    }
  }

export default HomeResults
