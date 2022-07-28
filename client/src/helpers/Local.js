/**
 * localStorage implementation is here
 */

class Local {
  // getToken to use in Api, gets token from local storage
  static getToken() {
    return localStorage.getItem("token") || "";
  }

  // getUser page, for when they successfully log in
  static getUser() {
    let userjson = localStorage.getItem("user");
    return userjson ? JSON.parse(userjson) : null;
  }

  // getUserId, to redirect to their page and also check if same user
  static getUserId() {
    let userjson = localStorage.getItem("user");
    console.log(userjson);
    if (!userjson) {
      return "";
    }

    let user = JSON.parse(userjson);
    return user.id;
  }

  // save user token info after they've been logged in
  static saveUserInfo(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // remove user token info when they log out
  static removeUserInfo() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default Local;
