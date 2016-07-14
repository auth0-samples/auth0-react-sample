import Auth0Lock from 'auth0-lock'

export default class LinkAccountService {
  constructor(auth) {
    this.auth = auth
    this.lock = new Auth0Lock(auth.clientId, auth.domain, {
      auth: {params: {state: 'linking'}},
      allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:'
      }
    })
    this.link = this.link.bind(this)
  }

  link(){
    // Call the show method to display the authentication window.
    this.lock.show()
  }
}
