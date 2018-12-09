import React, { Component } from 'react'
import './App.css'

import HomeHeader from './HomeHeader'
import Home from './Home'
import HomeResults from './HomeResults'

import MapHeader from './MapHeader'
import Map from './Map'



import { Route, Switch } from 'react-router-dom'
import PageNotFound from './PageNotFound'
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
      },
      citySearch : false,
      curentLocation : false
    }

  /*** CALLING APIS ***/
    componentDidMount(){
        this.renderSearch()  // Call Gmap
    }

    componentDidUpdate(){
      this.activateGMap()
    }


/********************* GOOGLE MAP *********************/

    /** LOADING Gmap**/
    // Load Gmap Script and call callback function
    renderSearch = () => {
      loadGMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDd8JybBcqZkubpn9BuEdE_0IayHRPPfVg&libraries=places&callback=activateGMap")
      window.activateGMap = this.activateGMap
    }

    // Gmap Callback fucntion is decided by url name
    activateGMap = () => {
      if(window.location.href.indexOf("map") > -1){
        this.initMap()
      } else {
        if (this.state.citySearch) {
            this.autoComplete()
        }
      }
    }

    /** AUTOCOMPLETE**/
    autoComplete = () => {
      console.log("Hello");
      let input = document.querySelector(".search-café")
      const options = {types: ['(cities)']};
      let autocomplete = new window.google.maps.places.Autocomplete(input, options)
      autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace()
            let lat = place.geometry.location.lat()
            let lng = place.geometry.location.lng()

            this.getMapCenter(place.formatted_address, lat, lng)
            console.log("holla");
            return
          })
          return
        }

        activateCitySearch = () => {
          let allCafes= []
          let markersData= []
          let citySearch= true
          this.setState({ allCafes, markersData, citySearch})
        }

        deActivateCitySearch = () => {
          this.setState({ citySearch : false })
          this.resetApp()
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
        this.activate4Square(lat, lng) // Call 4square
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

  mapMarkers = []

  initMap = () => {
    this.mapMarkers = [] // reset markers to 0

    let map = new window.google.maps.Map(document.getElementById('map'), {
          style: { height: '100%', position: 'static', width: '100%' },
          center: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng},
          zoom: 16
        })
    this.setMarker(map)
  }

  setMarker = (myMap) => {
    this.activeMarkers.map( customMarker => {  //!!!!!!! Changed map to forEcah !!!!!!

      // infowindow content
      let infowindowContent =
      `<div>
            <h1>${customMarker.name}</h1>
            <p>${customMarker.address}, ${customMarker.city}, ${customMarker.postalCode}, ${customMarker.state}, ${customMarker.country}</p>
      </div>`

      // create infowindow
      let myInfoWindow = new window.google.maps.InfoWindow({
            content: infowindowContent
          })

      // create Markers
      let marker = new window.google.maps.Marker({
            id: customMarker.id,
            position: {lat: customMarker.location.lat, lng: customMarker.location.lng},
            map: myMap,
            animation: window.google.maps.Animation.DROP,
            infowindow: myInfoWindow
          })

      this.mapMarkers.push(marker);

      // open infowindow
      window.google.maps.event.addListener(marker, 'click', () => {
      hideAllInfoWindows(myMap); // Close infoWindow if open
      myInfoWindow.open(myMap, marker);
      })

      // close infowindow
      let hideAllInfoWindows = (map) => {
        this.mapMarkers.forEach( (marker) => {
          marker.infowindow.close(map, marker)
          }
        )
      }

      return customMarker // Useless just to get rid  of warning message bloody Console :( Grrrrrrr
    })

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
       this.setState({query: query.replace(/\s\s+/g, ' ')})

     }

     // Open InfoWindow when a link is cliked form the list
     openInfoWindow = (link) => {
       this.mapMarkers.map( marker => {
         if (marker.id === link) {
           window.google.maps.event.trigger(marker, 'click');
          }
        return marker // USELESS
       })
     }

  activeMarkers = [] // Array of Active Markers

  //Filter through all the Markers to render only the ones that match the search
  checkActiveMarkers = () => {
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      this.activeMarkers = this.state.markersData.filter((marker) =>   match.test(marker.name))
    } else {
      this.activeMarkers = this.state.markersData
    }
  }

/********************* Enable User Location *********************/

userLocation = () => {
  // this.setState({ }) DO SOMETHING ABOUT THE STATE OF uselocation activated
  navigator.geolocation.getCurrentPosition(this.geoSuccess)
  this.setState({ curentLocation: true})
}

geoSuccess = (position) => {
  let userLat = position.coords.latitude
  let userLng  = position.coords.longitude
  let place = "near you"

  this.getMapCenter(place, userLat, userLng)
}
/********************* Reset App *********************/

resetApp = () => {

  let allCafes= []
  let markersData= []
  let query= ""
  let mapCenter= {
    name: "",
    lat: "",
    lng: ""
    }
  let citySearch = false
  let curentLocation = false

  this.setState({
    allCafes,
    markersData,
    query,
    mapCenter,
    citySearch,
    curentLocation
  })
}

/********************* Render *********************/
  render() {

    console.log("window", window.location.href);
    //Filter through all the Markers to render only the ones that match the search
    this.checkActiveMarkers()

    return (
      <div className="main">
        <Switch>
          <Route exact path="/"
                 render={() => (
                   <div className="home-page">
                     <HomeHeader citySearch={this.state.citySearch}/>
                     <Home  allCafes={this.state.allCafes}
                            citySearch={this.state.citySearch}
                            activateCitySearch={this.activateCitySearch}
                            deActivateCitySearch={this.deActivateCitySearch}
                            userLocation={this.userLocation}
                      />
                    <HomeResults activeMarkers={this.activeMarkers} citySearch={this.state.citySearch} curentLocation={this.state.curentLocation} mapCenter={this.state.mapCenter}/>
                  </div>
                 )}
          />

          <Route exact path="/map" render={() => (
                <div className="map-page">
                  <MapHeader/>
                  <Map  allCafes={this.state.allCafes}
                        openInfoWindow={this.openInfoWindow}
                        updateQuery={this.updateQuery}
                        query={this.state.query}
                        activeMarkers={this.activeMarkers}
                        resetApp={this.resetApp}
                    />
                </div>
          )}/>

          <Route component={PageNotFound}/>
        </Switch>
      </div>
    )
  }
}

// Function to Create Gmap Script Tag
let loadGMap = url => {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.className = "GMap"
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
