const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user
router.route("/:id")
  .get(userController.findOne)
 // .delete(userController.remove);



// Matches with "/api/"
router.route("/create")
  .post(userController.create);

module.exports = router;
