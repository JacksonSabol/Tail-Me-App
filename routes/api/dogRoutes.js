const router = require("express").Router();
const dogController = require("../../controllers/dogController");

// Matches with "/api/user
router.route("/:id")
  .get(dogController.findOne)
 // .delete(userController.remove);



// Matches with "/api/"
router.route("/")
  .post(dogController.create);

module.exports = router;
