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
        body: {
          username,
          password
        }
      }
    ).then(res => {
      console.log('res', res);
      if (res.status === "success") {
        this.setToken(res.access); // Setting the token in localStorage
        return Promise.resolve(res);
      }
    });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  isAdmin() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().roles) {
      this.logout();
    }
    let isAdmin = this.getProfile().roles.find(val => val === 1);
    if (isAdmin) return true;
    return false;
  }

  isSupervisor() {
    if (!this.loggedIn()) return false;
    if (!this.getProfile().roles) {
      this.logout();
    }
    let isAdmin = this.getProfile().roles.find(val => val === 2);
    if (isAdmin) return true;
    return false;
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }
}

export default AuthService;
