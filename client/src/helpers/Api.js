import Local from "./Local";

// This is a file that has all the knowledge/pathways for conducting a fetch

class Api {
  // generic 'do a fetch' function
  static async _doFetch(url, method = "GET", body = null) {
    // prepare fetch options
    let options = {
      method,
      headers: {},
    };

    // add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // add the body if there is a body
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // do the fetch and store the results in a "unified" myresponse object
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      if (response.ok) {
        myresponse.ok = true;
        myresponse.data = await response.json();
        myresponse.status = response.status;
      } else {
        myresponse.status = response.status;
        myresponse.error = response.statusText;
      }
    } catch (err) {
      myresponse.error = err.message;
    }
    return myresponse;
  }

  //  get trips
  static async getTrips() {
    return await this._doFetch("/trips");
  }

  // get a trip by id
  static async getTrip(id) {
    return await this._doFetch(`/trips/${id}`);
  }

  //   add a new trip (might need refactoring)
  //   static async addTrip(newTrip) {
  //     return await this._doFetch("/trips", "POST", newTrip);
  //   }

  //  register a user
  static async newUser(email, username, password, fullname, picture) {
    let body = { email, username, password, fullname, picture };

    return await this._doFetch("/register", "POST", body);
  }

  // edit user information
  static async editUser(
    picture,
    fullname,
    email,
    username,
    currentpassword,
    newpassword,
    id
  ) {
    let body = {
      picture,
      fullname,
      email,
      username,
      currentpassword,
      newpassword,
      id,
    };

    return await this._doFetch(`/users/${id}`, "PUT", body);
  }

  // login a user
  static async loginUser(username, password) {
    let body = { username, password };
    return await this._doFetch("/login", "POST", body);
  }

  // get a user by id
  static async getUser(id) {
    return await this._doFetch(`/users/${id}`);
  }

  // go to whatever url
  static async getContent(url) {
    return await this._doFetch(url);
  }

  // get groups with left join on users
  static async getGroupsAndUsers(id) {
    return await this._doFetch(`/tripGroups/users/${id}`);
  }
}

export default Api;
