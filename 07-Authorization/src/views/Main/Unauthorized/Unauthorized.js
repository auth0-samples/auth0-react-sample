import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'
import {Link} from 'react-router'

export class Unauthorized extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
  }

  render(){
    return (
      <div className={styles.root}>
        <h2>Unauthorized: you are not allowed to see this content</h2>
        <Link to={'/home'}>Back to Home</Link>
      </div>
    )
  }
}

export default Unauthorized;
