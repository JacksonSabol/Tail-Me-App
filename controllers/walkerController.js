const db = require("../models");
const axios = require("axios");
const Moment = require("moment");

// Defining methods for the walkerController
module.exports = {

  addWalker: function (req, res) {
    db.walker
      .upsert({
        id: req.body.userId,
        certification: req.body.certification,
        insurance: req.body.insurance,
        bond: req.body.bond,
        services: req.body.services,
        status: req.body.availibility,
        userId: req.body.userId
      })
      .then(dbmodel => res.status(200).send(dbmodel))
      .catch(err => res.status(422).json(err));
  },
  updateWalkerProfile: function (req, res) {
    db.user
      .upsert({
        id: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        address: req.body.address,
        City: req.body.City,
        State: req.body.State,
        zipCode: req.body.zipCode,
        country: req.body.country,

      })
      .then(dbmodel => res.status(200).send(dbmodel))
      .catch(err => res.status(422).json(err));
  },

  getWalkerWalks: function (req, res) {
    db.walks
      .findAll({
        attributes: [
          'id',
          [db.sequelize.fn('date_format', db.sequelize.col('checkinTime'), '%Y-%m-%d %H:%i:%s'), 'checkInTime'],

          [db.sequelize.fn('date_format', db.sequelize.col('finishTime'), '%Y-%m-%d %H:%i:%s'), 'checkOutTime'],
          'walkDate',
          'status'
        ],
        where: {
          walkerId: req.params.id

        },
        include: [{
          model: db.dogOwner,
          include: [{
            model: db.user,
            include: [{
              model: db.auth
            }]
          }]
        }]
        //pending how to compare two dates
        //           , where: 
        //db.sequelize.where(db.sequelize.fn('char_length', db.sequelize.col('issues')), 6)

        //db.sequelize.where(
        // db.sequelize.fn('Date', db.sequelize.col/('walkDate')),'=',
        //     db.sequelize.fn('Date', db.
        //   sequelize.col(new Date)))  
      })
      .then(dbModel => { res.json(dbModel) })
      .catch(err => res.status(422).json(err))
  },

  uploadPic: function (req, res) {
    console.log("BODY-updateImage")
    console.log(req.body.url)
    /* */

    var urlLink = req.body.url

    var tempFile = urlLink.split("/")
    var fileName = tempFile[tempFile.length - 1]
    console.log("FILENAME", fileName)

    const exif = require('exif-parser')
    const fs = require('fs')
    const request = require('request');

    var download = function (uri, filename, callback) {
      request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    var filepath = `./controllers/temp/${fileName}`
    download(urlLink, filepath, function () {
      console.log(filepath)
      console.log('done');

      let buffer = fs.readFileSync(filepath)
      let parser = exif.create(buffer)
      let result = parser.parse()


      console.log("image in download")
      console.log(result.tags.GPSLatitude)
      console.log(result.tags.GPSLongitude)
      fs.unlinkSync(filepath);

      let imageData = {

        url: req.body.url,
        GPSLatitude: result.tags.GPSLatitude,
        GPSLongitude: result.tags.GPSLongitude,
        GPSLatitudeRef: result.tags.GPSLatitudeRef,
        GPSLongitudeRef: result.tags.GPSLongitudeRef,
        DateTimeOriginal: result.tags.DateTimeOriginal,
        walkerId: req.params.id
      }


      db.images
        .create(imageData)
        .then(dbModel => res.json(dbModel))
        .catch(err => {
          console.log("Error", err)
          res.status(422).json(err)
        });
    });
  },

  getImages: function (req, res) {
    db.images
      .findAll({
        where: {
          walkerId: req.params.idWalk,
          sendCustomer: null
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getAllImages: function (req, res) {
    db.images
      .findAll({
        where: {
          walkerId: req.params.idWalk
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getImagesByWalk: function (req, res) {
    db.walkImages
      .findAll({
        where: {
          walkId: req.params.idWalk
        },
        include: [{
          model: db.images,
          required: true
        }]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getWalksSchedule: function (req, res) {
    db.walks
      .findAll({
        attributes: [
          'id',
          'dogOwnerId',
          [db.sequelize.fn('date_format', db.sequelize.col('walkDate'), '%Y-%m-%d %H:%i:%s'), 'walkDate'],

          [db.sequelize.fn('date_format', db.sequelize.col('finishTime'), '%Y-%m-%d %H:%i:%s'), 'checkOutTime'],
          'walkDate',
          'dogOwner.dogName'
        ], include: [{
          model: db.dogOwner,
          required: true
        }],
        where: {
          walkerId: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createSchedule: function (req, res) {
    db.walks
      .bulkCreate(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getDogOwners: function (req, res) {
    db.dogOwner
      .findAll({
        include: [{
          model: db.user,
          required: true
        }],

        where: {
          walkerId: req.params.idWalker
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateWalk: function (req, res) {
    db.walks
      .update(
        req.body,
        {
          where: {
            id: req.params.idWalk
          }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  deleteWalk: function (req, res) {
    db.walks.destroy({
      where: {
        id: req.params.idWalk
      }
    })
      .then(walkDeleted => res.json(walkDeleted))
      .catch(err => res.status(422).json(err));
  },

  updateCheckInOut: function (req, res) {
    console.log("updateCheckInOut");
    console.log(req.params.type);
    console.log(req.params.idWalk);
    console.log(req.params.lat);
    console.log(req.params.lng);

    // console.log("checkinGPSLatitude: ", req.body.latitude)
    // console.log("checkinGPSLongitude: ", req.body.longitude)

    if (req.params.type === "in") {
      var data = {
        checkinTime: Date.now(),
        checkinGPSLatitude: req.params.lat,
        checkinGPSLongitude: req.params.lat,

        //Here is the note for insertion 
        note: `Your dog, ${req.body.dogName}, was picked up at ${Moment(Date.now()).format("HH:mm - MM/DD/YYYY")}\n\nPoop:\n\nPee: \n\nPlay: \n\nAdditional Notes: \n\n`
      }
      db.walks
        .update(
          data,
          {
            where: {
              id: req.params.idWalk
            }
          })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
    else if (req.params.type === "out") {
      var data = {
        finishTime: Date.now(),
        checkoutGPSLatitude: req.params.lat,
        checkoutGPSLongitude: req.params.lat,
        note: req.body.note
      }
      console.log(data)
      db.walks
        .update(
          data,
          {
            where: {
              id: req.params.idWalk
            }
          })
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
      // .catch(err => res.status(422).json(err));

    }
    else { (res.json("type error, need to be 'in' or 'out' for the check")) }
  },

  addPicturesToCloudary: function (req, res) {
    require('dotenv').config();
    const walkId = req.params.id;
    console.log("WalkIdddd:", walkId);
    console.log("FormData", req.file);
    const url = `https://api.cloudinary.com/v1_1/viaro-networks-inc/image/upload`;
    axios.get(url, req.body, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      image_metadata: true
    })
      .then(function (response) {
        res.json(response.data)
      })
  },

  updateImageOwner: function (req, res) {
    db.images
      .update(
        req.body,
        {
          where: {
            walkId: req.params.idWalk,
            id: req.params.idImage
          }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addImagesToUser: function (req, res) {
    db.walkImages
      .create(
        req.body,
        {})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateImageSentStatus: function (req, res) {
    db.images
      .update(
        {
          sendCustomer: true
        },
        {
          where: {
            id: req.params.ImageID
          }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  checkImageExist: function (req, res) {
    console.log("test")
    console.log("res", req.body)
    console.log("req params", req.params)
    db.walkImages
      .findOne({
        where: {
          userId: req.params.userId,
          imageId: req.params.imageId
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  getWalkNote: function (req, res) {

    db.walks
      .findOne({
        where: {
          id: req.params.walkId

        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log("ERROR", err); res.status(422).json(err) });
  },

  updateNote: function (req, res) {
    console.log(req.body)
    db.walks
      .update(
        req.body,
        {
          where: {
            id: req.params.walkId
          }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log("ERROR", err); res.status(422).json(err) });
  },
  getWalkerCustomers: function (req, res) {

    db.user
      .findAll({
        include: [{
          model: db.dogOwner,
          where: {
            walkerId: req.params.id
          }
        }],
        raw: true
      })
      .then(dbModel =>
        res.json(dbModel))
      .catch(err => { console.log("ERROR2", err); res.status(422).json(err) });
  },

  editUserInfo: function (req, res) {
    //Edit User table Information
    db.user
      .update(
        req.body.userDataObj,
        {
          where: {
            id: req.params.userId
          }
        }
      )
      .then(dbModel => {
        //Edit dogOwner table Information
        db.dogOwner
          .update(
            req.body.dogOwnerDataObj,
            {
              where: {
                id: req.params.dogOwnerId
              }
            }
          )
        res.json(dbModel)
      })
      .catch(err => { console.log("ERROR2", err); res.status(422).json(err) });
  },

  deleteUserData: function (req, res) {
    //Delete user from auth and on cascade from all tables.
    db.auth
      .destroy(
        {
          where: {
            id: req.params.userId
          }
        }
      ).then(dbModel => res.json(dbModel))
      .catch(err => { console.log("ERROR2", err); res.status(422).json(err) });
  },

  updatePath: function (req, res) {
    //Updte the walk coords in the path record
    console.log("updatePath: ", req.params)
    let data = {
      pointType: req.params.pointType,
      lat: req.params.lat,
      lng: req.params.lng,
      walkId: req.params.walkId
    }

    db.path
      .create(data)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log("Error", err)
        res.status(422).json(err)
      });
  },

  getPath: function (req, res) {
    //get the walk coords in the path record
    console.log("getpath-parmas:", req.params)
    db.path
      .findAll({
        where: {
          walkId: req.params.walkId
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log("ERROR", err); res.status(422).json(err) });
  },

  uploadProfilePicture: function (req, res) {
    console.log("uploadProfilePicture", req.body)
    console.log("uploadProfilePicture", req.params)
    db.user
      .update(
        { profilePhotoURL: req.body.url },
        {
          where: {
            id: req.params.userId
          }
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log("ERROR", err); res.status(422).json(err) });
  },

  getWalkerList: function (req, res) {

    db.auth
      .findAll({
        attributes: ['username'],
        include: [{
          model: db.user,
          where: {
            userType: 'walker'
          },
          include: [{
            model: db.walker,
            where: {
              status: "available"
            }
          }]

        }]

      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};
