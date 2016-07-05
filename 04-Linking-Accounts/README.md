# Login Example for Auth0-React Quickstart Guides

This project contains a regular ReactJS application where react-router is used to require authentication for urls with restricted access.
The library `auth0-lock` provides the user authentication, and we also have `src/utils/AuthService.js` class to wrap Lock Widget usage and manage the localStorage items.

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

* [auth0-lock](https://github.com/auth0/lock)
* [webpack](https://webpack.github.io)
* [postcss](http://postcss.org)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
* [react.js](http://facebook.github.io/react/)
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](http://chaijs.com)
