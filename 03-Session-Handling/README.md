# Session Handling

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/03-session-handling)

This example shows how to manage session when authenticating with Auth0 in your ReactJS application. It also shows how to validate JSON Web Tokens using the library `jwt-decode`.

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

### 1. jwtHelper to validate JWTs

```javascript
/* ===== ./src/utils/jwtHelper.js ===== */
import decode from 'jwt-decode';

export function getTokenExpirationDate(token){
  const decoded = decode(token)
  if(!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token){
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
```

### 2. AuthService checking valid session

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'

export default class AuthService {
  ...

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  ...
}
```

## Used Libraries

* [auth0-lock](https://github.com/auth0/lock)
* [jwt-decode](https://github.com/auth0/jwt-decode)
* [webpack](https://webpack.github.io)
* [postcss](http://postcss.org)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
* [react.js](http://facebook.github.io/react/)
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](http://chaijs.com)
