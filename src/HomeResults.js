import React, { Component, Fragment } from 'react'

class HomeResults extends Component {

    render(){
      console.log(this.props);
        return(
          <Fragment>
            {
              !this.props.citySearch ?
                  this.props.activeMarkers.length > 0 && this.props.curentLocation ?
                    <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés <span>{this.props.mapCenter.name}</span></p>
                  :
                    <p>Please click one of the options above</p>
              : this.props.activeMarkers.length > 0 ?
                <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés in <span>{this.props.mapCenter.name}</span></p>
                  :
                <span></span>
            }

          </Fragment>
        )
    }
  }

export default HomeResults
