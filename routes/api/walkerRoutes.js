const router = require("express").Router();
const walkerController = require("../../controllers/walkerController");
const globalController = require("../../controllers/globalController");

// Matches with "/api/walker"
//router.route("/")

// /api/walker/create to populate the walker.js model/table
router.route("/create")
  .post(walkerController.addWalker);

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

router.route("/check/:type/:idWalk/:lat/:lng")
  .put(walkerController.updateCheckInOut)

// Matches with "/api/walker/invitecustomer/..."
router.route("/invitecustomer/:name/:phone/:specialcode/:walkerid/:walkername")
  .post(globalController.createInvitation);

router.route
  ("/:id/uploadImages")
  .post(walkerController.addPicturesToCloudary)

/* router.route("/walk/:idWalk/:idImage/updateImageOwner")
  .put(walkerController.updateImageOwner); */

// Matches with "/api/walker/createOwner/..."
router.route("/createOwner/:owneruserid/:specialcode/:walkerid")
  .post(globalController.createInvitation);

router.route("/walk/uploadImage")
.post(walkerController.addImagesToWalk);

router.route("/walk/:walkId/:imageId")
.get(walkerController.checkImageExist);

module.exports = router;
