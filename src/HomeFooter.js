import React, { Component, Fragment } from 'react'

class HomeFooter extends Component {

    render(){
        return( <Fragment>
            { !this.props.citySearch && !this.props.curentLocation ?
                (<p>Please click one of the options above</p>)
                :(<Fragment></Fragment>)
            }
              </Fragment>
        )
    }
  }

export default HomeFooter
