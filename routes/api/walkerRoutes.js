const router = require("express").Router();
const walkerController = require("../../controllers/walkerController");
const globalController = require("../../controllers/globalController");
var multer = require("multer")
//var upload = multer({ dest: "uploads" })

//const DIR = './uploads';

//let storage = multer.diskStorage({
//  destination: function (req, file, callback) {
//    callback(null, DIR);
//  },
//  filename: function (req, file, cb) {
///    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//  }/
//});

//let upload = multer({storage: storage});



const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function (req, file, next) {
      next(null, './public/photo-storage');
    },

    //specify the filename to be unique
    filename: function (req, file, next) {
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function (req, file, next) {
    if (!file) {
      console.log('no file')
      next();
    }

    // only permit image mimetypes
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported")
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

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

router.route("/walks/:id/uploadPic")
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

router.route("/walk/:idWalk/:idImage/updateImageOwner")
  .put(walkerController.updateImageOwner);

// Matches with "/api/walker/createOwner/..."
router.route("/createOwner/:owneruserid/:specialcode/:walkerid")
  .post(globalController.createInvitation);

module.exports = router;
