# Custom Login

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/02-custom-login)

This example shows how to implement ***Login*** and ***SignUp*** features to your ReactJS application without using `auth0-lock` widget. Using [auth0.js library](https://github.com/auth0/auth0.js) and a custom form, we can easily add Auth0 authentication.

## Getting Started

The helper class in `src/utils/AuthService.js` wraps auth0 library usage and manage the localStorage items.

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

### 1. AuthService handling auth0 api and localStorage

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0 from 'auth0-js'

export default class AuthService {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      callbackOnLocationHash: true
    });

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(params, onError){
    //redirects the call to auth0 instance
    this.auth0.login(params, onError)
  }

  signup(params, onError){
    //redirects the call to auth0 instance
    this.auth0.signup(params, onError)
  }

  parseHash(hash){
    // uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken)
    }
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }
}
```

## Used Libraries

* [auth-js](https://github.com/auth0/auth0.js)
* [webpack](https://webpack.github.io)
* [postcss](http://postcss.org)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
* [react.js](http://facebook.github.io/react/)
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](http://chaijs.com)
