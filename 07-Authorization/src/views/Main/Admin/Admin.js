import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'
import {Link} from 'react-router'

export class Admin extends React.Component {
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
        <h2>Admin</h2>
        <p>You are viewing this because you are logged in and you have 'admin' role</p>
        <Link to={'/home'}>Back to Home</Link>
      </div>
    )
  }
}

export default Admin;
