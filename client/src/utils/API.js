import axios from "axios";

export default {

  // Gets the Walks
  getTodayWalks: function () {
    console.log("test")
    return axios.get("/api/walker/walks");
  },
  // Gets all walkers
  getWalker: function () {
    return axios.get("/api/walker");
  },
  // Deletes the book with the given id
  deleteWalker: function (id) {
    return axios.remove("/api/walker/" + id);
  }
  
};
