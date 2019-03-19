import axios from "axios";

export default {

    // Gets owner Walks - other one is unnecessary when joining tables in dogController
    getOwnerId: function (id) {
        // console.log("idAPI:", id)
        return axios.get(`/api/dogProfile/${id}/getId`)
    },
    // getOwnerWalks: function (id) {

    //     return axios.get(`/api/dogProfile/${id}/walks`);
    // },
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
        // console.log(id)
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

    getAllImages: function (id) {
        return axios.get(`/api/walker/walks/${id}/getAllImages`)
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

    deleteWalk: function (idWalk) {
        return axios.delete(`/api/walker/walks/delete/${idWalk}`)

    },
    updateCheckInOut: function (type, idWalk, lat, lng, dataNote) {
        console.log("API.js: ", type, idWalk, lat, lng,)
        // return axios.put(`/api/walker/check/${type}/${idWalk}`, data)
        return axios.put(`/api/walker/check/${type}/${idWalk}/${lat}/${lng}`, dataNote)
    },

    //Walker text invite signup to the owner
    createTextInvitation: function (data) {
        console.log("API.js -  createTextInvitation")
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


    getImagesOwner: function (idUser) {
        return axios.get(`/api/dogProfile/${idUser}/gallery`)

    },
    getImagesWalk: function (idWalk) {
        return axios.get(`/api/walker/walks/images/${idWalk}`)

    },

    addImagesToUser: function (data) {
        return axios.post(`/api/walker/walk/uploadImage`, data)

    },
    // /walk/image/update/:ImageID
    updateImageSentStatus: function (imageId) {
        return axios.put(`/api/walker/walk/image/update/${imageId}`)
    },

    checkImageExist: function (userId, imageId) {
        console.log("IMAGE")
        return axios.get(`/api/walker/walk/checkImage/${userId}/${imageId}`)
    },

    addNote: function (walkId, notes) {

        return axios.put(`/api/walker/walk/${walkId}/addNote`, notes)
    },
    getNote: function (walkId) {
        return axios.get(`/api/walker/walk/getnote/${walkId}`)
    },

    getWalkerCustomers: function (id) {

        return axios.get(`/api/walker/getWalkerCustomers/${id}`)
    },

    editUserData: function (userId,dogOwnerId,userData) {

        return axios.put(`/api/walker/editCustomerInfo/${userId}/${dogOwnerId}`,userData)
    },
    deleteUserData: function (userId) {
        return axios.delete(`/api/walker/deleteUser/${userId}/`) 
    },
    
    updatePath: function (pointType, walkId, lat, lng) {
        return axios.post(`/api/walker/updatepath/${pointType}/${walkId}/${lat}/${lng}/`) 
    },

    getPath: function (walkId) {
        return axios.get(`/api/walker/getpath/${walkId}/`) 
    },

    uploadProfilePicture: function (userId, data) {
        console.log("API-uploadProfilePicture", userId, data)
        return axios.put(`/api/walker/uploadProfilePicture/${userId}`, data) 
    },
    getWalkers: function () {
        return axios.get(`/api/walker/getWalkersList`)
    }
};
