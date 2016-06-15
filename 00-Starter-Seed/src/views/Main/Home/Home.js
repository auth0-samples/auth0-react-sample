import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import styles from './styles.module.css'

export class Home extends React.Component {
  render(){
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome!</p>
      </div>
    )
  }
}

Home.contextTypes = {
  router: T.object
}

export default Home;
