import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'


class Map extends Component {

  state = {
  query: "" //query of the Search
  }

  // When Input Changes the query changes too
   updateQuery(query){
     this.setState({query: query.trim()})
   }

   // Open InfoWindow when a link is cliked form the list
   openInfoWindow(link){
     this.props.markerObjectsArray.map( marker => {
       if (marker.id === link) {
         window.google.maps.event.trigger(marker.id, 'click');
         console.log("link is working", marker.id);
       }
     })
   }


    render(){
      console.log("Map Props", this.props);
      //Filter through all the Markers to render only the ones that match the search
      let showMarker

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showMarker = this.props.markersData.filter((marker) =>   match.test(marker.name))
      } else {
        showMarker = this.props.markersData
      }


        return(
              <div className="mainContent">

                {/*****Generate the Search*****/}
                <div className="search">
                  <input
                    className="search-cafes"
                    placeholder="Search your Café"
                    value={this.state.query}
                    onChange={(e) => this.updateQuery(e.target.value)}
                      />
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <p className="cafes-numbers">We found <span>{showMarker.length}</span> cafés</p>

                      { showMarker.length > 0 ?
                      <div className="search-result">
                          <ul className="search-list">
                            {showMarker.map(cafe =>
                              <li id= {cafe.id} key={cafe.id}>
                                <a className="cafe-name" onClick={() =>  this.openInfoWindow(cafe.id)}>{cafe.name}</a>
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
