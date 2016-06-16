import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './styles.module.css'
import AuthService from 'utils/AuthService'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService),
  }

  constructor(props, context) {
    super(props, context)
    const { auth, location } = props;
    console.log(auth, location);
    if (auth.parseHash(location.pathname)){
      // this.context.router.push('/')
    }
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
