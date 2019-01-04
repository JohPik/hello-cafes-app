import React, { Fragment } from 'react'

const HomeFooter = (props) => {
  return( <Fragment>
      { !props.citySearch && !props.curentLocation ?
          (<p>Please click one of the options above</p>)
          :(<Fragment></Fragment>)
      }
        </Fragment>
  )
}

export default HomeFooter
