# Customizing Lock

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/10-customizing-lock)

This example shows how to customize the `Lock` widget. Sometimes you need to change some UI stuff so this is what we are going to do.

## Getting Started

The library `auth0-lock` provides the user authentication, and we also have `src/utils/AuthService.js` class to wrap Lock Widget usage and customization.

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

### 1. AuthService customizing the lock instance

```javascript
/* ===== ./src/utils/AuthService.js ===== */
... //omitting some code
import LogoImg from 'images/test-icon.png';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: LogoImg,
        primaryColor: "#b81b1c"
      }
    })
    ... //omitting some code
  }
  ... //omitting some code
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
