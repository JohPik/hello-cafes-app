import React, { Component } from 'react'
import './App.css'
import Home from './Home'
import Map from './Map'
import { Route } from 'react-router-dom'

class App extends Component {

  /*** CALLING APIS ***/
    componentWillMount(){
        this.renderSearch()  // Call Gmap
    }

    componentDidUpdate(){
      this.activateGMap()
    }

  /*** GOOGLE MAP ***/
    /** AUTOCOMPLETE**/
    // render Autocomplete Search
    renderSearch = () => {
      loadGMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0&libraries=places&callback=activateGMap")
      window.activateGMap = this.activateGMap
      // window.activatePlaceSearch = this.activatePlaceSearch
    }

    // Use Autocomplete to generate next map center
    activateGMap = () => {
      if(window.location.href.indexOf("map") > -1){
        console.log("MAP");
      } else {
        let input = document.querySelector(".search-café")
        let autocomplete = new window.google.maps.places.Autocomplete(input)
        autocomplete.addListener('place_changed', () => {
              var place = autocomplete.getPlace()
              let lat = place.geometry.location.lat()
              let lng = place.geometry.location.lng()
              console.log("lat ", lat);
              console.log("lng ", lng);
            })

        console.log("Home");
      }
    }


  render() {
    return (
      <div className="main">
        <Route exact path="/"
               render={() => (
                 <Home />
               )}
        />

        <Route exact path="/map" render={() => (
            <div className="map-screen">
              <Map />
            </div>
            )}
        />
      </div>
    )
  }
}

// Function to Create Gmap Script Tag
function loadGMap (url){
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.className = "GMap"
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
