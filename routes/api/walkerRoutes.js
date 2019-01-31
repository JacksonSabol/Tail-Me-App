const router = require("express").Router();
const walkerController = require("../../controllers/walkerController");

// Matches with "/api/walker"
router.route("/")
  .get(walkerController.findAll)
  .post(walkerController.create);

// Matches with "/api/walker/:id"
router.route("/:id")
  .delete(walkerController.remove);

// Matches with "/api/walker/walks/"
router.route("/walks")
  .get(walkerController.getWalks);

module.exports = router;
