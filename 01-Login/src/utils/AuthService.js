import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {})
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      console.log("authenticated authResult", authResult)
      this.setToken(authResult.idToken)
    })

    this.login = this.login.bind(this)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  parseHash(pathname) {
    var authHash = this.lock.parseHash(pathname)
    if (authHash && authHash.idToken) {
      this.setToken(authHash.idToken)
      return true
      // this.lock.getProfile(authHash.idToken, (err, profile) => {
      //   if (err) {
      //     console.log("Error loading the Profile", err)
      //   } else {
      //     auth.setProfile(profile)
      //   }
    }
    return false
  }

  loggedIn(){
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile(profile){
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile(){
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken){
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    return localStorage.getItem('id_token')
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
