# Calling API

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/08-calling-apis)

This example shows how to make authenticated API calls using the JSON Web Token provided by Auth0 in your ReactJS application. A basic node.js server is also provided as an example of `express-jwt` usage to parse JWT Tokens and protect private endpoints in `server.js`.

## Getting Started

The helper class in `src/utils/AuthService.js` wraps the `fetch` command in order to included the Authentication header.

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

### 1. Client side authenticated requests

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  ... // omitting some code

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // if logged in, includes the authorization header
    if (this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus) // to raise errors for wrong status
    .then(response => response.json()) // to parse the response as json
  }
}
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
* [express](https://expressjs.com/)
* [express-jwt](https://github.com/auth0/express-jwt)
