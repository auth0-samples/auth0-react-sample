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
    this.parseAuthHash()
  }

  parseAuthHash() {
    var authHash = this.lock.parseHash(this.props.location.pathname)
    if (authHash && authHash.id_token) {
      auth.setToken(authHash.id_token)
      this.lock.getProfile(authHash.id_token, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err)
        } else {
          auth.setProfile(profile)
        }
        this.context.router.push('/')
      })
    }
  }

  login(){
    this.lock.show({popup:true}, (err, profile, idToken) => {
      if (err){
        console.log('Error', err)
        return
      }
      auth.setToken(idToken);
      auth.setProfile(profile);
      this.context.router.push('/')
    });
  }

  loginRedirect(){
    this.lock.show();
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={this.login.bind(this)}>Login</Button>
          <Button bsStyle="primary" onClick={this.loginRedirect.bind(this)}>Login with Redirect</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
