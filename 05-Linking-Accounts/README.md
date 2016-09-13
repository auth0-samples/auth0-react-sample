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

## Libraries Used

* [auth0-lock](https://github.com/auth0/lock)
* [webpack](https://webpack.github.io)
* [postcss](http://postcss.org)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
* [react.js](http://facebook.github.io/react/)
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](http://chaijs.com)

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.