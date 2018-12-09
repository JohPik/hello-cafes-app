import React, { Component } from 'react'

import MapHeader from './MapHeader'
import MapMain from './MapMain'


class Map extends Component {


    render(){

        return(
          <div className="map-page">
            <MapHeader/>
            <MapMain  allCafes={this.props.allCafes}
                      openInfoWindow={this.props.openInfoWindow}
                      updateQuery={this.props.updateQuery}
                      query={this.props.query}
                      activeMarkers={this.props.activeMarkers}
                      resetApp={this.props.resetApp}
              />
          </div>
        )

    }
  }
export default Map
