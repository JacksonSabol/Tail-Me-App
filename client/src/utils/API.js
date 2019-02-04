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

    //upload photo walks
    uploadPhotoServer: function (image, id) {
        console.log("Before server")

        return axios.post(`/api/walker/walks/${id}/uploadPic`, image,{ headers: {'Content-Type': 'multipart/form-data' }})
    },

    //upload photo walks
    getImages: function (id) {
        console.log("Before server 2")
        return axios.get(`/api/walker/walks/${id}/getImages`)
    },

     //upload photo walks
     getMyWalks: function (id) {
        console.log("Before server 3" , id)
        return axios.get(`/api/walker/${id}/walkSchedule/`)
    },

    //add schedule
    addSchedule: function(data,idWalker) {
        console.log("Before server 4")
        return axios.post(`/api/walker/schedule/${idWalker}/`,data )
    },

    //get dogOwners related to Walker
    getDogOwners: function(idWalker) {
        console.log("Before server 5")
        return axios.get(`/api/walker/${idWalker}/getDogOwners`)
    },

    updateWalk:function(idWalk,data) {
        return axios.put(`/api/walker/schedule/${idWalk}`,data)

    }


};
