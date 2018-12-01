import React, { Component, Fragment } from 'react'

class HomeHeader extends Component {

    render(){
        return(
          <Fragment>
            <div className="home-heading">
              <h1>Hello<i className="fas fa-coffee"></i>Cafés</h1>
            </div>
            <div className="home-subheading">
              <h2>Search Cafe in</h2>
            </div>
          </Fragment>
        )
    }
  }

export default HomeHeader
