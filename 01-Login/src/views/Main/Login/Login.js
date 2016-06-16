import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './styles.module.css'

import Auth0Lock from 'auth0-lock'
import auth from 'utils/auth'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object
  }

  constructor(props, context) {
    super(props, context)
    this.lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)
    this.lock.on("authenticated", this.authenticate)
    this.parseAuthHash()
  }

  parseAuthHash() {
    var authHash = this.lock.parseHash(this.props.location.pathname)
    if (authHash && authHash.idToken) {
      auth.setToken(authHash.idToken)
      this.lock.getProfile(authHash.idToken, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err)
        } else {
          auth.setProfile(profile)
        }
        this.context.router.push('/')
      })
    }
  }

  authenticate(authResult) {
    console.log("authResult", authResult);
    auth.setToken(authResult.idToken)
    auth.setProfile(authResult.profile)
    this.context.router.push('/')
  }

  login(){
    this.lock.show();
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={this.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
