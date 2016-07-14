import React, { PropTypes as T } from 'react'
import {Row, Col, Thumbnail, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import LinkedAccountsList from 'components/LinkedAccount/LinkedAccountsList'
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
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
        <h2 className={styles.pageTitle}>Home</h2>
        <Row>
          <Col md={2} mdOffset={4} className={styles.pane}>
            <Thumbnail src={profile.picture}>
              <p>Welcome {profile.name}!</p>
              <p>
                <Button bsStyle="default" onClick={this.logout.bind(this)}>Logout</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col md={4} className={styles.pane}>
            <LinkedAccountsList profile={profile} auth={this.props.auth}></LinkedAccountsList>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
