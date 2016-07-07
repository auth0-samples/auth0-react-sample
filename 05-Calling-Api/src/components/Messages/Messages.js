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
    this.callApis()
  }

  callApis(){
    const { auth } = this.props
    fetch('/api/public')
      .then(response => response.json())
      .then(response => this.setState({publicMsg: response.message}))
    auth.fetch('/api/private')
      .then(response => this.setState({privateMsg: response.message}))
  }

  render(){
    return (
      <ListGroup>
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
