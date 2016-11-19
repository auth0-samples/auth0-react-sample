import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0 from 'auth0-js'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      callbackURL: `${window.location.origin}/login`
    });

    this.login = this.login.bind(this)
  }

  login() {
    this.auth0.login({
      responseType: 'id_token token',
      scope: 'openid profile {API SCOPES}',
      audience: __AUTH0_AUDIENCE__ // obtained from APIs section in dashboard. See the quickstart link in the readme for more.
    })
  }

  logout() {
    // Clear access and id tokens from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
  }

  parseHash(hash) {
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);
    }
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getAccessToken()
    return !!token && !isTokenExpired(token)
  }

  getAccessToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('access_token')
  }

  fetch(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getAccessToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }
}