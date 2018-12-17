import React, { Component, Fragment } from 'react'
import { Link} from 'react-router-dom'

class HomeResults extends Component {

    render(){
      console.log("HOME RESULTS PROPS", this.props);
        return(
          <Fragment>
            {!this.props.citySearch ?

              /**** Using Current Location ***/
                  this.props.activeMarkers.length > 0 && this.props.curentLocation ?
                    (<Fragment>
                      <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés <span>{this.props.mapCenter.name}</span></p>
                      <button className="home-button map-result">
                        <Link to="/map">
                          See Results on Map
                        </Link>
                      </button>
                      <span>or</span>
                      <button className="home-button back-menu" onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                    </Fragment>)
                  : this.props.curentLocation ? (<Fragment/>) :
                    (<p>Please click one of the options above</p>)

              /**** Using Input Search City ***/
              : this.props.activeMarkers.length > 0 ?
                  (<Fragment>
                    <p className="home-cafes-numbers">We found <span>{this.props.activeMarkers.length}</span> cafés in <span>{this.props.mapCenter.name}</span></p>
                    <button className="home-button home-button-result">
                      <Link to="/map">
                        See Results on Map
                      </Link>
                    </button>
                    <span>or</span>
                    <button onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                  </Fragment>)
                  : this.props.autoCompleteLoading ?
                      (<Fragment>
                        <p className="home-loading">Currently Searching, Please Wait.</p>
                        <span>or</span>
                        <button onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                      </Fragment>)

                    :
                      (<Fragment>
                        <span>or</span>
                        <button onClick={() => this.props.resetApp()}><i className="fas fa-arrow-circle-left"/>Return to Menu</button>
                      </Fragment>)
            }
          </Fragment>
        )
    }
  }

export default HomeResults
