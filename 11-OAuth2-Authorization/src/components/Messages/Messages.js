import React, { PropTypes as T } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Messages extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      publicMsg: "",
      privateMsg: ""
    }
  }

  componentDidMount(){
    const { auth } = this.props
    // public http request
    fetch('/api/public')
      .then(response => response.json())
      .then(response => this.setState({publicMsg: response.message}))
    // using auth to send an http request with authorization header
    auth.fetch('/api/private')
      .then(response => this.setState({privateMsg: response.message}))
      .catch(error => this.setState({privateMsg: "" + error}))
  }

  render(){
    return (
      <ListGroup className={styles.root}>
        <ListGroupItem header="/api/public response">
          {this.state.publicMsg}
        </ListGroupItem>
        <ListGroupItem header="/api/private response">
          {this.state.privateMsg}
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default Messages;
