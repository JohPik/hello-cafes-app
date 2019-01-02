import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {

    render(){
      return (
        <div className="page-not-found">
            <h1>Error 404</h1>
            <h2>Did you just drop your coffee cup?</h2>
            <p>the page you are looking for does not exist</p>
            <Link  to="/" className="home"><button className="home-button back-menu"><i className="fas fa-arrow-circle-left"/>Return to Search Page</button></Link>
        </div>

      )
    }
}

export default PageNotFound
