import decode from "jwt-decode";

class MainService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || "http://trazappapi2.herokuapp.com/api"; // API server domain
    // this.domain = domain || "http://localhost:8000/api"; // API server domain
    this.fetch = this.fetch.bind(this);
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    if (token) {
      return !!token && !this.isTokenExpired(token); // handwaiving here
    }
    return false;


  }

  setToken(token) {
    // Saves user token to localStorage
    localStorage.setItem("token", token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // Checking if token is expired. N
      if (decoded.exp < Date.now() / 1000 || decoded.exp === null) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(res => this._checkStatus(res))
      .then(async response => {
        if (response) {
          return response.json();
        } else {
          return { status: "fail" };
        }
      });
  }

  _checkStatus = async (response, ) => {
    // console.log(response.json());
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      console.log('error', response);
    }
  };
}

export default MainService;
