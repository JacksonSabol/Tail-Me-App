import axios from "axios";

export default {

    // Gets the Walks
    getOwnerWalks: function (id) {
     
        return axios.get(`/api/dogProfile/${id}/walks`);
    },
    getWalkerWalks: function (id) {
    
        return axios.get(`/api/walker/${id}/walks`);
    },
    // Gets all walkers
    getWalker: function () {
        return axios.get("/api/walker");
    },
    // Deletes the walker with the given id
    deleteWalker: function (id) {
        return axios.remove(`/api/walker/${id}`);
    },

    //User Profile
    getUserProfile: function (id) {
        console.log(id)
        return axios.get(`/api/userProfile/${id}`);
    },

    //DogProfile
    getDogProfile: function (id) {
    
        return axios.get(`/api/dogProfile/${id}`);
    },

    //upload photo walks
    uploadPhotoWalks: function (data, id) {
        return axios.post(`/api/walker/${id}/uploadPic`, data)
    },

    //upload photo walks
    getImages: function (id) {
        return axios.get(`/api/walker/walks/${id}/getImages`)
    },

    //Get walks
    getMyWalks: function (id) {
        return axios.get(`/api/walker/${id}/walkSchedule/`)
    },

    //add schedule
    addSchedule: function (data, idWalker) {
        return axios.post(`/api/walker/schedule/${idWalker}/`, data)
    },

    //get dogOwners related to Walker
    getDogOwners: function (idWalker) {
        return axios.get(`/api/walker/${idWalker}/getDogOwners`)
    },

    updateWalk: function (idWalk, data) {
        return axios.put(`/api/walker/schedule/${idWalk}`, data)

    },
    updateCheckInOut: function (type, idWalk, lat, lng) {
        console.log("API.js: ", type, idWalk, lat, lng)
        // return axios.put(`/api/walker/check/${type}/${idWalk}`, data)
        return axios.put(`/api/walker/check/${type}/${idWalk}/${lat}/${lng}`)
    },

    //Walker invite signup to the owner
    createInvitation: function (data) {
        console.log("API.js -  createInvitation")
        return axios.post("/api/walker/invitecustomer/" + data.ownerName + "/" + data.phoneNumber + "/" + data.specialCode + "/" + data.walkerId + "/" + data.walkerName);
    },
    //Walker invite signup to the owner ("/createOwner/:owneruserid/:specialcode/:walkerid")
    createOwner: function (data) {
        console.log("API.js -  createInvitation")
        return axios.post("/api/walker/createOwner/" + data.owneruserid + "/" + data.specialCode + "/" + data.walkerId);
    },

    addPicturesToCloudinary: function (formData) {
        return axios.post(
            "https://api.cloudinary.com/v1_1/viaro-networks-inc/image/upload",
            formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                image_metadata: true
            })
    },

  
    getImagesOwner: function (idOwner) {
        return axios.get(`/api/dogProfile/${idOwner}/gallery`)

    },
    getImagesWalk: function (idWalk) {
        return axios.get(`/api/walker/walks/${idWalk}/getImages`)

    },

    addImagesToWalk: function (data) { 
        return axios.post(`/api/walker/walk/uploadImage`,data)

    },
    
    checkImageExist : function(walkId,imageId) {
    return axios.get(`/api/walker/walk/${walkId}/${imageId}`)
    }
    
};
