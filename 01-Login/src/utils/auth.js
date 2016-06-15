const auth = {
  loggedIn(){
    return !!localStorage.token
  },
  setProfile(profile){
    localStorage.profile = JSON.stringify(profile)
  },
  getProfile(){
    const profile = localStorage.profile
    return profile ? JSON.parse(localStorage.profile) : {}
  },
  setToken(token){
    localStorage.token = token
  },
  getToken(){
    return localStorage.token
  },
  logout(){
    delete localStorage.token
    delete localStorage.profile
  }
}

export default auth;
