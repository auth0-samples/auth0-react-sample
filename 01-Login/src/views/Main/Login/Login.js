import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './styles.module.css'

import Auth0Lock from 'auth0-lock'
import auth from 'utils/auth'

export class Login extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)
  }

  login(){
    this.lock.show({popup:true}, (err, profile, idToken) => {
      if (err){
        console.log('Error', err)
        return
      }
      auth.setProfile(profile);
      auth.setToken(idToken);
      this.context.router.replace('/')
    });
  }

  signin(){
    this.lock.show();
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={this.login.bind(this)}>Login</Button>
          <Button bsStyle="primary" onClick={this.signin.bind(this)}>Login with Redirect</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

Login.contextTypes = {
  router: T.object
}

export default Login;
