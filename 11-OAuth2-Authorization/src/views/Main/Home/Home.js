import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import Messages from 'components/Messages/Messages'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
  }

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <Messages auth={this.props.auth}></Messages>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
