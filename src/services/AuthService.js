import decode from "jwt-decode";
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
      `${this.domain}/token`,
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
      return Promise.resolve(res);
    });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
  }

  isAdmin() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().rol) {
      this.logout();
    }
    return this.getProfile().rol === 'ADM' ? true : false;
  }

  isQA() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().rol) {
      this.logout();
    }
    return this.getProfile().rol === 'QAS' ? true : false;
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    let token = this.getToken();
    return (token) ? decode(token) : {};
  }
}

export default AuthService;
