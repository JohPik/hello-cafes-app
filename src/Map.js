import React, { Component } from 'react'


class Map extends Component {

  componentWillMount(){
    //Make sure there is no other script

    //render the map
  }

  componentWillUnmount(){
    //Remove all Gmap Script Tag
    stopScript()
  }

    render(){
        return(
              <div>the map</div>
        )
    }
  }

  // Remove the script
  function stopScript(){
    // let script = window.document.querySelector(".GMap")
    // script.remove()

    let scripts = window.document.querySelectorAll("head script")
    scripts.forEach( (element) => {
      element.remove()
    })
  }

export default Map
