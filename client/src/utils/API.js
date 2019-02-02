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
    },

    //User Profile
    getUserProfile: function (id) {
       console.log(id)
        return axios.get("/api/userProfile/" + id);
    },

    //DogProfile
    getDogProfile: function (id) {
        console.log(id)
         return axios.get("/api/dogProfile/" + id);
     },

};
