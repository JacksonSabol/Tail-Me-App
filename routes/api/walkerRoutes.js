const router = require("express").Router();
const walkerController = require("../../controllers/walkerController");
const globalController = require("../../controllers/globalController");

// Matches with "/api/walker"
//router.route("/")

// /api/walker/create to populate the walker.js model/table
router.route("/create")
  .post(walkerController.addWalker);

// /api/walker/updateProfile
router.route("/updateProfile")
  .post(walkerController.updateWalkerProfile);


// Matches with "/api/walker/:id/walks/"
router.route("/:id/walks")
  .get(walkerController.getWalkerWalks);

//router.route("/walks/:id/uploadPic")
//.post(walkerController.uploadPic);

router.route("/:id/uploadPic")
  /* replace foo-bar with your form field-name */
  .post(walkerController.uploadPic);

router.route("/walks/:idWalk/getImages")
  .get(walkerController.getImages);

router.route("/walks/:idWalk/getAllImages")
  .get(walkerController.getAllImages);

//walks/images/${idWalk}
router.route("/walks/images/:idWalk")
  .get(walkerController.getImagesByWalk);

router.route("/:id/walkSchedule")
  .get(walkerController.getWalksSchedule);

router.route("/schedule/:idWalker/:idOwner")
  .post(walkerController.createSchedule)

router.route("/schedule/:idWalker/")
  .post(walkerController.createSchedule)

router.route("/:idWalker/getDogOwners")
  .get(walkerController.getDogOwners)

router.route("/schedule/:idWalk")
  .put(walkerController.updateWalk)

// /api/walker/walks/delete/idWalk to delete a walk
router.route("/walks/delete/:idWalk")
  .delete(walkerController.deleteWalk)

router.route("/check/:type/:idWalk/:lat/:lng")
  .put(walkerController.updateCheckInOut)

// Matches with "/api/walker/invitecustomer/..."
router.route("/invitecustomer/:name/:phone/:specialcode/:walkerid/:walkername")
  .post(globalController.createTextInvitation);

router.route
  ("/:id/uploadImages")
  .post(walkerController.addPicturesToCloudary)

/* router.route("/walk/:idWalk/:idImage/updateImageOwner")
  .put(walkerController.updateImageOwner); */

// Matches with "/api/walker/createOwner/..."
router.route("/createOwner/:owneruserid/:specialcode/:walkerid")
  .post(globalController.createOwner);

router.route("/walk/uploadImage")
  .post(walkerController.addImagesToUser);

router.route("/walk/image/update/:ImageID")
  .put(walkerController.updateImageSentStatus);

router.route("/walk/checkImage/:userId/:imageId")
  .get(walkerController.checkImageExist);

router.route("/walk/:walkId/addNote")
  .put(walkerController.updateNote);

router.route("/walk/getnote/:walkId")
  .get(walkerController.getWalkNote);


router.route("/getWalkerCustomers/:id")
  .get(walkerController.getWalkerCustomers);

router.route("/editCustomerInfo/:userId/:dogOwnerId")
  .put(walkerController.editUserInfo);

router.route("/deleteUser/:userId")
  .delete(walkerController.deleteUserData);

router.route("/updatepath/:walkId/:lat/:lng")
  .post(walkerController.updatePath);

router.route("/getpath/:walkId")
  .get(walkerController.getPath);

router.route("/uploadProfilePicture/:userId")
  .put(walkerController.uploadProfilePicture);

 
module.exports = router;
