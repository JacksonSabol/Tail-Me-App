const router = require("express").Router();
const dogController = require("../../controllers/dogController");

// Matches with "/api/user
router.route("/:id")
  .get(dogController.findOne)

// Matches with "/api/dogProfile/findWalker"
router.route("/findWalker")
  .get(dogController.findWalker)

// Matches with "/api/dogProfile/create"
router.route("/create")
  .post(dogController.create);

// Matches with "/api/"
router.route("/:idUser/gallery")
  .get(dogController.getImagesOwner);

  // Matches with "/api/dogProfile/:id/walks/"
// router.route("/:id/walks")
// .get(dogController.getOwnerWalks);

// Matches with "/api/dogProfile/:id/getId"
router.route("/:id/getId")
  .get(dogController.getOwnerId)


module.exports = router;
