import axios from "axios";

const API_URL = "35.224.242.211:5000";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
export const USER_NAME_SESSION_ATTRIBUTE_TOKEN = "authenticatedUserToken";
export const USER_ROLE_SESSION_ATTRIBUTE_TOKEN = "authenticatedUserRole";
class AuthenticationService {
  tokenUser = "";

  executeJwtAuthenticationService(data) {
    return axios.post(
      `${API_URL}/api/users/login`,
      data /* {
            //headers:{ authorization:'Basic '+ window.btoa(username + ":" +password)}
           data
        } */,
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      }
    );
  }

  registerSuccessfulLoginForJwt(username, token) {
    console.log("usertoken " + token);
    this.tokenUser = token;
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN, token);
    this.setupAxiosInterceptors(this.createJWTToken(token));
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
      }
      return config;
    });
  }

  getUsername() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    console.log(user);
    return user;
  }
  getToken(token) {
    let userT = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);
    console.log("usertoken " + userT);

    return "Bearer " + userT;
  }

  setRole(role) {
    sessionStorage.setItem(USER_ROLE_SESSION_ATTRIBUTE_TOKEN, role);
  }

  getRole() {
    return sessionStorage.getItem(USER_ROLE_SESSION_ATTRIBUTE_TOKEN);
  }
}

export default new AuthenticationService();
