const db = require("../models");
const axios = require("axios");


// Defining methods for the walkerController
module.exports = {

  addWalker: function (req, res) {
    console.log(req.body);
    db.walker
      .upsert({
        id: req.body.userId,
        certification: req.body.certifications,
        services: req.body.services,
        status: "available",
        userId: req.body.userId
      })
      .then(dbmodel => res.status(200).send(dbmodel))
      .catch(err => res.status(422).json(err));
  },

  getWalkerWalks: function (req, res) {
    console.log("test2")
    db.walks
      .findAll({
        attributes: [
          'id',
          [db.sequelize.fn('date_format', db.sequelize.col('checkinTime'), '%Y-%m-%d %H:%i:%s'), 'checkInTime'],

          [db.sequelize.fn('date_format', db.sequelize.col('finishTime'), '%Y-%m-%d %H:%i:%s'), 'checkOutTime'],
          'walkDate'
        ],
        where: {
          walkerId: req.params.id

        }
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
        walkId: req.body.walkId,
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

    console.log("Get Images Walking..:", req.params.idWalk)
    db.images
      .findAll({
        where: {
          walkerId: req.params.idWalk,

        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getWalksSchedule: function (req, res) {
    console.log("Get Schedule..:", req.params.id)
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
    console.log("Create Schedule");
    console.log(req.body);
    db.walks
      .bulkCreate(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getDogOwners: function (req, res) {
    console.log("GetDogOwners");
    console.log(req.body);
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
    console.log("Update");
    console.log(req.body);
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
        checkinGPSLongitude: req.params.lat
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
        checkoutGPSLongitude: req.params.lat
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
        .catch(err => res.status(422).json(err));

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
    console.log("Update Image Owner");
    console.log(req.body);
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
  }
};
