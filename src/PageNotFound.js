import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {

    render(){
      return (
        <Fragment>
            <h1>Did you just drop your coffee cup?</h1>
            <h2>Error 404</h2>
            <h3>the page you are looking for does not exist</h3>
            <Link  to="/" className="home"><i className="fas fa-search"></i>return to Search Page</Link>
        </Fragment>

      )
    }
}

export default PageNotFound
