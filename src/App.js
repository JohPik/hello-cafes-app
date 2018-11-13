import React, { Component } from 'react'
import './App.css'
import Home from './Home'
import Map from './Map'
import { Route } from 'react-router-dom'

class App extends Component {

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

export default App;
