# Custom Login Example for Auth0-React Quickstart Guides

This project contains a regular ReactJS application where react-router is used to require authentication for urls with restricted access.
In order to add Auth0 features to a custom form, the library `auth0-js` is included. We also have `src/utils/AuthService.js` class to wrap the library usage and manage the localStorage items.

## Getting Started

Run:

```bash
# Install the dependencies
npm install

# copy configuration and replace with your own
cp .env.example .env

# Run
npm start
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
