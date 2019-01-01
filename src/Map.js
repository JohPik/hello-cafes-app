import React, { Component } from 'react'



class Map extends Component {

// reset Query
  componentWillUnmount(){
    this.props.resetApp()
  }

    render(){

        return(
              <div className="map-main">

                {/***** Generate the Side Bar with Search and Result in List  *****/}
                <div className="map-side-bar">
                  {/*** Search Input ***/}
                  <div className="map-search">
                    <input
                      className="search-cafes"
                      placeholder="Search your Café"
                      value={this.props.query}
                      onChange={(e) => this.props.updateQuery(e.target.value)}
                        />
                      <i className="fas fa-search" aria-hidden="true"></i>
                      <p className="cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés</p>
                  </div>

                  {/*** Search List Result ***/}
                  { this.props.activeMarkers.length > 0 ?
                  <div className="map-search-result">
                      <ul className="map-search-list">
                        {this.props.activeMarkers.map(cafe =>
                          <li id= {cafe.id} key={cafe.id}>
                            <button className="cafe-name" onClick={() =>  this.props.openInfoWindow(cafe.id)}>{cafe.name}</button>
                            <p className="cafe-address" >
                              {cafe.address}, {cafe.postalCode}, {cafe.state},<br/> {cafe.city}, {cafe.country}
                            </p>
                        </li>
                        )}
                      </ul>
                    </div>
                    :
                    this.props.allCafes.length > 1 ?
                      <div className="search-failed">
                        <p className="map-no-match">Ooops, nothing matches your search, please look for another venue.</p>
                      </div>
                        :
                      <div className="search-loads">
                        <p className="map-loading-cafes">Page is Loading Please Wait</p>
                      </div>
                      }

                </div>


                {/*****Generate the map*****/}
                <div id="map"></div>
            </div>
            )
    }
  }
export default Map
