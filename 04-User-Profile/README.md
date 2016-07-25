# User Profile

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/04-user-profile)

This example shows how to retrieve an Auth0 user’s profile and how to update it via the Management API in a ReactJS application. After following the steps outlined here, you will be able to retrieve, set, and update a user profile.

## Getting Started

The library `auth0-lock` provides the user authentication, and we also have `src/utils/AuthService.js` class to wrap Lock Widget usage and the Management API requests.

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

### 1. Request User Profile Data After Authenticate

```javascript
/* ===== ./src/utils/AuthService.js ===== */

export default class AuthService extends EventEmitter {
  ...

  _doAuthentication(authResult){
    // Saves the user token
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

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }
}
```

### 2. Update User Profile

```javascript
/* ===== ./src/utils/AuthService.js ===== */
export default class AuthService extends EventEmitter {
  // a small constructor change to make domain accessible in other methods
  constructor(clientId, domain) {
    super()
    this.domain = domain // setting domain parameter as an instance attribute
    ...
  }

  // the new updateProfile
  updateProfile(userId, data){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken() //setting authorization header
    }
    // making the PATCH http request to auth0 api
    return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newProfile => this.setProfile(newProfile)) //updating current profile
  }
  ...
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
