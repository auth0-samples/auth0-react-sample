import React, { PropTypes as T } from 'react'
import {ListGroupItem, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class LinkedAccountItem extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService),
    profile: T.object,
    identity: T.object
  }

  unlink(identity){
    if (window.confirm(`Are you sure you want to unlink ${identity.connection}?`)) {
      this.props.auth.unlinkAccount(identity)
    }
  }

  renderUnlink(){
    const { profile, identity } = this.props
    if (profile.user_id != identity.provider + '|' + identity.user_id){
      return (
        <Button
            onClick={this.unlink.bind(this, identity)}
            className={styles.unlink}>
            unlink
          </Button>
      )
    }
  }

  render(){
    const { identity } = this.props
    const profileName = identity.profileData ? identity.profileData.name : 'Main'

    return (
      <ListGroupItem header={profileName}>
        {identity.connection}
        {this.renderUnlink()}
      </ListGroupItem>
    )
  }
}

export default LinkedAccountItem;
