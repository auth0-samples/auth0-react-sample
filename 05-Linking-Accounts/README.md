# Linking Accounts

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/05-linking-accounts)

This example shows how to link/unlink different Auth0 users accounts.

## Getting Started

The library `auth0-lock` provides the user authentication, and we also have `src/utils/AuthService.js` class to wrap Lock Widget responsible for authentications and `src/utils/LinkAccountService.js` to wrap Lock Widget instance responsible to show the link account window.

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

### 1. Show Link Account Window

```javascript
/* ===== ./src/utils/LinkAccountService.js ===== */
import Auth0Lock from 'auth0-lock'

export default class LinkAccountService {
  constructor(auth) {
    this.auth = auth
    // the Auth0Lock instance to show signin window to link a provider
    this.lock = new Auth0Lock(auth.clientId, auth.domain, {
      auth: {params: {state: 'linking'}}, // state to identify in the callback
      allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:' // new window title
      }
    })
    this.link = this.link.bind(this)
  }

  link(){
    // Call the show method to display the authentication window.
    this.lock.show()
  }
}
```

### 2. AuthService handling link account requests

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.clientId = clientId
    this.domain = domain
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    authResult.state = authResult.state || '' //making sure state exists
    if (authResult.state.includes('linking')){
      this.linkAccount(authResult.idToken) // linkAccount when state is linking
    } else {
      // Otherwise saves the user token
      this.setToken(authResult.idToken)
      // Async loads the user profile data
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('Error loading the Profile', error)
        } else {
          this.setProfile(profile)
        }
      })
    }
  }

  ... // omitting methods

  fetchApi(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    }

    const userId = this.getProfile().user_id
    return fetch(`https://${this.domain}/api/v2/users/${userId}/${url}`, {
      headers,
      ...options
    })
    .then(response => response.json())
  }

  linkAccount(token){
    // prepares api request body data
    const data = {
      link_with: token
    }
    // sends a post to auth0 api to create a new identity
    return this.fetchApi('identities', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error){
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
  }
}
```

### 3. AuthService handling unlink requests

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  ... //omitting some code
  unlinkAccount(identity){
    // sends a delete request to unlink the account identity
    this.fetchApi(`identities/${identity.provider}/${identity.user_id}`, {
      method: 'DELETE'
    })
    .then(response => {
      const profile = this.getProfile()
      if (response.error){
        alert(response.message)
      } else {
        // updates profile identities
        this.setProfile({...profile, identities: response})
      }
    })
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
