import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import auth from 'utils/auth'
import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  logout(){
    auth.logout()
    this.context.router.replace('/login');
  }

  render(){
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome {auth.getProfile().name}!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
