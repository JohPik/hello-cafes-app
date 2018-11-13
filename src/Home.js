import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

  /*** CALLING APIS ***/
    componentWillMount(){
        this.renderSearch()  // Call Gmap
    }

    componentWillUnmount(){
      stopScript() // Remove All Gmap Script
    }
  /*** GOOGLE MAP ***/
    /** AUTOCOMPLETE**/
    // render Autocomplete Search
    renderSearch = () => {
      loadGMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0&libraries=places&callback=activatePlaceSearch")
      window.activatePlaceSearch = this.activatePlaceSearch
    }

    // Use Autocomplete to generate nex map center
    activatePlaceSearch = () => {
      let input = document.querySelector(".search-café")
      let autocomplete = new window.google.maps.places.Autocomplete(input)
      autocomplete.addListener('place_changed', () => {
            var place = autocomplete.getPlace()
            let lat = place.geometry.location.lat()
            let lng = place.geometry.location.lng()
            console.log("lat ", lat);
            console.log("lng ", lng);
            //this.mapCenterUpdate(lat, lng)
            //this.fourSquare() // Call fourSquare API to get the raw data about my cafes
          })
    }

    render(){
      return (
        <div className="home-main">
            <p>Where are you?</p>
            <input className="search-café" placeholder="Enter your location"/>
            <Link to="/map" className="search-input"><i className="fas fa-search"></i></Link>
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
  // script.async = true
  // script.defer = true
  index.parentNode.insertBefore(script, index)
}

// Remove the script
function stopScript(){
  let script = window.document.querySelector(".GMap")
  script.remove()

  let scripts = window.document.querySelectorAll("head script")
  scripts.forEach( (element) => {
    element.remove()
  })
}

export default Home
