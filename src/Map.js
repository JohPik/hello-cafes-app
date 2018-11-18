import React, { Component } from 'react'



class Map extends Component {

// reset Query
  componentWillUnmount(){
    this.props.cleanQuery()
  }

    render(){

        return(
              <div className="mainContent">

                {/*****Generate the Search*****/}
                <div className="search">
                  <input
                    className="search-cafes"
                    placeholder="Search your Café"
                    value={this.props.query}
                    onChange={(e) => this.props.updateQuery(e.target.value)}
                      />
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <p className="cafes-numbers">We found <span>{this.props.shownMarker.length}</span> cafés</p>

                      { this.props.shownMarker.length > 0 ?
                      <div className="search-result">
                          <ul className="search-list">
                            {this.props.shownMarker.map(cafe =>
                              <li id= {cafe.id} key={cafe.id}>
                                <a className="cafe-name" onClick={() =>  this.props.openInfoWindow(cafe.id)}>{cafe.name}</a>
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
                            <p className="no-match">Ooops, nothing matches your search, please look for another venue</p>
                          </div>
                            :
                          <div className="search-loads">
                            <p className="loading-cafes">Page is Loading Please Wait</p>
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
