import React, { PropTypes as T } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import LinkedAccountItem from './LinkedAccountItem'
import AuthService from 'utils/AuthService'
import LinkAccountService from 'utils/LinkAccountService'
import styles from './styles.module.css'

export class LinkedAccountsList extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService),
    profile: T.object
  }

  render(){
    const { profile, auth } = this.props
    const linker = new LinkAccountService(auth)
    let items = []
    if (profile && profile.identities) {
      items = profile.identities.map(identity => {
        return (<LinkedAccountItem {...this.props} identity={identity} />)
      })
    }

    return (
      <div className={styles.root}>
        <h3>Linked Accounts</h3>
        <ListGroup>{items}</ListGroup>
        <Button onClick={linker.link} bsStyle="primary">Link Account</Button>
      </div>
    )
  }
}

export default LinkedAccountsList;
