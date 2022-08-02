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

  //  get users
  static async getUsers() {
    return await this._doFetch("/users");
  }

  // get a trip by id
  static async getTrip(id) {
    return await this._doFetch(`/trips/${id}`);
  }

  static async getItineraries() {
    return await this._doFetch(`/itinerary/`);
  }

  //   add a new itinerary item
  static async addToItinerary(newActivity) {
    return await this._doFetch("/itinerary", "POST", newActivity);
  }

  //  register a user
  static async newUser(email, username, password, fullname, picture) {
    let body = { email, username, password, fullname, picture };

    return await this._doFetch("/register", "POST", body);
  }

  //  Reaction to message
  static async newReaction(reaction, FK_user_id, FK_message_id) {
    let body = {
      reaction,
      FK_user_id,
      FK_message_id,
    };

    return await this._doFetch("/reactions/post", "POST", body);
  }

  // Get reactions
  static async getReactions() {
    return await this._doFetch(`/reactions`, "GET");
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

  // user can edit lists info
  static async editList(name, isComplete, id) {
    let body = {
      name,
      isComplete,
      id,
    };

    return await this._doFetch(`/lists/${id}`, "PUT", body);
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

  //  save a new list
  static async newList(list) {
    // let body = { list };

    return await this._doFetch("/lists", "POST", list);
  }

  // get all the trips added addresses
  static async getTripAddress(id) {
    return await this._doFetch(`/addresses/${id}`, "GET");
  }

  // adds a new address to the trip
  static async newTripAddress(address) {
    return await this._doFetch("/addresses", "POST", address);
  }
  //deletes trip address from trip
  static async deleteTripAddress(id) {
    return await this._doFetch(`/addresses/${id}`, "DELETE");
  }
}

export default Api;
