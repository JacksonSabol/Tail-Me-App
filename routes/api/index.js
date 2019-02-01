const router = require("express").Router();
const walkerRoutes = require("./walkerRoutes");
const userRoutes = require("./userRoutes");
const dogRoutes = require("./dogRoutes");

// Walker Routes
router.use("/walker", walkerRoutes);

//User Routes
router.use("/userProfile", userRoutes);

//Dog Routes
router.use("/dogProfile", dogRoutes);

module.exports = router;
