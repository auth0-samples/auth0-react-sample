# Authorization

[Full Tutorial](https://auth0.com/docs/quickstart/spa/react/07-authorization)

This example shows one of the ways of adding ***Authorization*** for a resource in your ReactJS application. We have an `/admin` page, which is only accessible for users with an `admin` role.

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

### 1. AuthService method to check if user is admin

```javascript
/* ===== ./src/utils/AuthService.js ===== */
...
export default class AuthService extends EventEmitter {
  ...// omitting some methods
  isAdmin(){
    // Checks if user have `admin` role in his profile app_metadata
    const profile = this.getProfile();
    const { roles } = profile.app_metadata || {};
    return !!roles && roles.indexOf('admin') > -1;
  }
}
```

### 2. Protect routes for admin only access

```javascript
/* ===== ./src/views/Main/routes.js ===== */
... // omitting imports

// initializing the AuthService instance
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
// onEnter callback to require admin role
const requireAdminAuth = (nextState, replace) => {
  if (!auth.isAdmin()) {
    replace({ pathname: '/unauthorized' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route onEnter={requireAuth}> // all nested routes require authentication
        <Route path="home" component={Home} />
        // only /admin route required also 'admin' role
        <Route path="admin" component={Admin} onEnter={requireAdminAuth} />
        <Route path="unauthorized" component={Unauthorized} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}

export default makeMainRoutes
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
