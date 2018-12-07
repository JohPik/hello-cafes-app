import React, { Component, Fragment } from 'react'

class HomeHeader extends Component {

    render(){
        return(
          <Fragment>
            <div className="home-heading">
              <h1>Hello<i className="fas fa-coffee"></i>Cafés</h1>
            </div>
            <div className="home-subheading">

                { !this.props.citySearch ?
                  <h2>Search Cafés in</h2>
                  :
                  <h2>Search Cafés in <span>Your City</span></h2>
                }

            </div>
          </Fragment>
        )
    }
  }

export default HomeHeader
