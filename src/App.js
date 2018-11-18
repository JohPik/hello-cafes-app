import React, { Component } from 'react'
import './App.css'
import Home from './Home'
import Map from './Map'
import { Route } from 'react-router-dom'
import MapHeader from './MapHeader'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {

  state = {
    allCafes: [], //Store the Raw Data coming from fourSquare
    markersData: [], //Store the Markers Data
    query: "",  //query of the Search
    mapCenter: {
      name: "",
      lat: "",
      lng: ""
      }
    }


  /*** CALLING APIS ***/
    componentWillMount(){
        this.renderSearch()  // Call Gmap
    }

    componentDidUpdate(){
      this.activateGMap()
    }


/********************* GOOGLE MAP *********************/

    /** LOADING Gmap**/
    // Load Gmap Script and call callback function
    renderSearch = () => {
      loadGMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0&libraries=places&callback=activateGMap")
      window.activateGMap = this.activateGMap
    }

    // Gmap Callback fucntion is decided by url name
    activateGMap = () => {
      if(window.location.href.indexOf("map") > -1){
        this.initMap()
      } else {
        this.autoComplete()
      }
    }

    /** AUTOCOMPLETE**/
    autoComplete = () => {
      let input = document.querySelector(".search-café")
      const options = {types: ['(cities)']};
      let autocomplete = new window.google.maps.places.Autocomplete(input, options)
      autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace()
            let lat = place.geometry.location.lat()
            let lng = place.geometry.location.lng()

            this.getMapCenter(place.formatted_address, lat, lng)
            this.activate4Square(lat, lng) // Call 4square
          })
        }

  /** BEFORE RENDERING MAP **/
    // Define Map Center
      getMapCenter = (place, lat, lng) => {
        let updatedMapCenter = {
        name: place,
        lat: lat,
        lng: lng
        }
        this.setState({
          mapCenter: updatedMapCenter
        })
      }
    //Create Markers
      createMarkers(cafes){
        let markersData = []
          cafes.map( cafe => {
            let marker = {
              id: '',
              name: '',
              address: '',
              city:'',
              postalCode: '',
              state: '',
              country: '',
              location: {
                lat: 0,
                lng: 0
              }
            }
          marker.id = cafe.venue.id
          marker.name = cafe.venue.name
          marker.address = cafe.venue.location.address
          marker.city = cafe.venue.location.city
          marker.postalCode = cafe.venue.location.postalCode
          marker.state = cafe.venue.location.state
          marker.country = cafe.venue.location.country
          marker.location.lat = cafe.venue.location.lat
          marker.location.lng = cafe.venue.location.lng
          return markersData.push(marker)
        })
        this.setState({ markersData })
      }

  /** INIT MAP**/

  markerObjectsArray = [] //Array of Marker Objects

  initMap = () => {

    let map = new window.google.maps.Map(document.getElementById('map'), {
          style: { height: '100%', position: 'static', width: '100%' },
          center: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng},
          zoom: 16
        })

    this.shownMarker.map( customMarker => {
      // create Markers
      let marker = new window.google.maps.Marker({
            position: {lat: customMarker.location.lat, lng: customMarker.location.lng},
            map: map,
            animation: window.google.maps.Animation.DROP
          })

      // infowindow content
      // let infowindowContent =  `${customMarker.name}`
      let infowindowContent =  `<div>
            <h1>${customMarker.name}</h1>
            <p>${customMarker.address}, ${customMarker.city}, ${customMarker.postalCode}, ${customMarker.state}, ${customMarker.country}</p>
      </div>`


      // create infowindow
      let infowindow = new window.google.maps.InfoWindow({
            content: infowindowContent
          })


      // open infowindow
      marker.addListener('click', () => {
            infowindow.open(map, marker);
          })

      this.markerObjectsArray.push(customMarker) // push the marker to the Array of markers

      return customMarker // Useless just to get rid  of warning message bloody Console :( Grrrrrrr
    })

    return map // Useless just to get rid  of warning message bloody Console :( Grrrrrrr
  }

/********************* FOURSQUARE *********************/
    activate4Square = (lat, lng) => {
      // Add the lat and lng provided by autocomplete to 4Square url
      let url = `https://api.foursquare.com/v2/venues/explore?client_id=FBFR4MRSN5YJ34CQKWAN0RWG55X41LX0ILOLM5JW52T0ZMKP&client_secret=2NPKFK05BW3WOBENMIWPRPFKQEDBWLNGXX1ANW5YUFQ1QHLD&v=20180323&limit=100&ll=${lat},${lng}&radius=1500&query=Café`
      // Search For Cafes
      fetch(url)
        .then(places=> places.json())
        .then(parsedJSON => {
          //Get allCafes
          this.setState({ allCafes: parsedJSON.response.groups[0].items })
          //Get allMarkers
          this.createMarkers(this.state.allCafes)
        })
        .catch(error => console.log("oops", error))
    }

/********************* Search Map *********************/

    // When Input Changes the query changes too
     updateQuery = (query) => {
       this.setState({query: query.trim()})
     }

     // Open InfoWindow when a link is cliked form the list
     openInfoWindow = (link) =>{
       this.markerObjectsArray.map( marker => {
         if (marker.id === link) {
           window.google.maps.event.trigger(marker, 'click');
           console.log("link is working", marker.id);
         }
       })
     }

  shownMarker = [] // Array of Shown Markers

  //Filter through all the Markers to render only the ones that match the search
  checkshownMarkers = () => {
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      this.shownMarker = this.state.markersData.filter((marker) =>   match.test(marker.name))
    } else {
      this.shownMarker = this.state.markersData
    }
  }

/********************* Render *********************/
  render() {

    //Filter through all the Markers to render only the ones that match the search
    this.checkshownMarkers()

    return (
      <div className="main">
        <Route exact path="/"
               render={() => (
                 <Home allCafes={this.state.allCafes}/>
               )}
        />

        <Route exact path="/map" render={() => (
            <div className="map-screen">
              <MapHeader/>
              <Map allCafes={this.state.allCafes}
                markersData={this.state.markersData}
                openInfoWindow={this.openInfoWindow}
                updateQuery={this.updateQuery}
                query={this.state.query}
                shownMarker={this.shownMarker}
                />
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
