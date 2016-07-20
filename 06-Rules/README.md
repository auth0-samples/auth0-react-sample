# Rules

This example shows how to add work with `Auth0` rules, which are very usefull to extend functionality.

## Getting Started

The library `auth0-lock` provides the user authentication, and we also have `src/utils/AuthService.js` class to wrap Lock Widget usage and manage the localStorage items.

In order to get start, run the three commands below. Make sure your `.env` file has the correct values from your auth0 account.

```bash
# Install the dependencies
npm install

# copy configuration and replace with your own
cp .env.example .env

# Run
npm start
```

The npm start command uses webpack to compile the application code and run a simple server for the development environment. It also keeps watching for file changes, updating the browser tab properly.

Shut it down manually with Ctrl-C.

## Important Snippets

### 1. Show country attribute in profile

```javascript
/* ===== ./src/components/Profile/ProfileDetails.js ===== */
import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import s from './styles.module.css'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render(){
    const { profile } = this.props
    return (
      <Row className={s.root}>
        <Col md={2} mdOffset={4}>
          <Image src={profile.picture} circle className={s.avatar} />
        </Col>
        <Col md={6}>
          <h3>Profile Details</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
          <p><strong>Country (added by rule): </strong> {profile.country}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
```

## Used Libraries

* [auth0-lock](https://github.com/auth0/lock)
* [webpack](https://webpack.github.io)
* [postcss](http://postcss.org)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
* [react.js](http://facebook.github.io/react/)
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](http://chaijs.com)
