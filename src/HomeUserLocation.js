import React, { Component, Fragment } from 'react'
import { Link} from 'react-router-dom'

class HomeUserLocation extends Component {

    render(){
        return(
          <Fragment>
          { !this.props.activeMarkers.length > 0 ?
                  this.props.curentLocationTest ?
                  (<Fragment>
                      <div className="home-result">
                        <p className="home-cafes-no-result-user-location">
                          <span>Sorry</span>, we found <span>0</span> cafés <span>near you</span>.
                        </p>
                        <button className="home-button back-menu" onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                      </div>
                   </Fragment>)
                  :
                /*Loading Animation*/
                  (<div className="svg-loader">
                    <svg x="0px" y="0px" width="5em" height="5em" viewBox="0 0 40 40">
                      <path opacity="0.2" fill="#F22C63" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                      <path fill="#F22C63" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                      C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="0.5s"
                        repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>)
                  :
                /*Results*/
                (<Fragment>
                  <div className="home-result">
                    <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés <span>{this.props.mapCenter.name}</span></p>
                      <Link to="/map">
                        <button className="home-button map-result">
                          <p>See Results on Map</p>
                          <i className="fas fa-map-marked-alt"></i>
                        </button>
                      </Link>
                    <span className="home-span-or">or</span>
                    <button className="home-button back-menu" onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                  </div>
                  </Fragment>)
          }
        </Fragment>
        )
    }
  }

export default HomeUserLocation
