const auth = {
  loggedIn(){
    return !!localStorage.token
  },
  setProfile(profile){
    this.profile = profile
  },
  getProfile(){
    return this.profile
  },
  setToken(token){
    localStorage.token = token
  },
  getToken(){
    return localStorage.token
  },
  logout(){
    delete localStorage.token
  }
}

export default auth;
