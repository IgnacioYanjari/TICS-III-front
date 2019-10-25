import MainService from "services/MainService";

class AuthService extends MainService {
  // Initializing important variables
  constructor(domain) {
    super(domain);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(
      `${this.domain}/api/token`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        })
      }
    ).then(res => {
      if (res.access)
        this.setToken(res.access); // Setting the token in localStorage
      console.log(this.getProfile());
      return Promise.resolve(res);
    });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
  }

  isAdmin() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().role) {
      this.logout();
    }
    return this.getProfile().role === 'ADM' ? true : false;
  }

  isQA() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().role) {
      this.logout();
    }
    return this.getProfile().role === 'QAS' ? true : false;
  }

}

export default AuthService;
