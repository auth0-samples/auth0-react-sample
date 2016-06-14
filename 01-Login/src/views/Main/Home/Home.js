import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import auth from 'utils/auth'
import styles from './styles.module.css'

export class Home extends React.Component {
  logout(){
      auth.logout()
      this.context.router.replace('/login');
  }

  render(){
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

Home.contextTypes = {
  router: T.object
}

export default Home;
