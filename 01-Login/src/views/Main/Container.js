import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'
import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);
    // __GAPI_KEY__
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        router: this.context.router
      })
    }

    return (
      <Jumbotron>
        <h2 className={styles.mainTitle}>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
        </h2>
        {children}
      </Jumbotron>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default Container;
