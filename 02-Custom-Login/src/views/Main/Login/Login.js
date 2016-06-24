import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Col smOffset={2} sm={8} className={styles.formContainer}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="email">
              <ControlLabel>E-mail</ControlLabel>
              <FormControl type="text" ref="email" placeholder="yours@example.com" />
            </FormGroup>

            <FormGroup controlId="password">
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" ref="password" placeholder="Password" />
            </FormGroup>

            <FormGroup>
              <Button type="submit">Login</Button>
            </FormGroup>
          </Form>
        </Col>
      </div>
    )
  }
}

export default Login;
