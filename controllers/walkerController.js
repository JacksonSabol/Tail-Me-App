const db = require("../models");


// Defining methods for the walkerController
module.exports = {

  addWalker: function (req, res) {
    console.log(req.body);
    db.walker
      .create({
        certification: req.body.certifications,
        services: req.body.services,
        status: "available",
        userId: req.body.userId
      })
      .then(dbmodel => res.status(200).send(dbmodel))
      .catch(err => res.status(422).json(err));
  },

  getWalks: function (req, res) {
    console.log("test2")
    db.walks
      .findAll({
        attributes: [
          'id',
          [db.sequelize.fn('date_format', db.sequelize.col('checkinTime'), '%Y-%m-%d %H:%i:%s'), 'checkInTime'],

          [db.sequelize.fn('date_format', db.sequelize.col('finishTime'), '%Y-%m-%d %H:%i:%s'), 'checkOutTime'],
          'walkDate'
        ]
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
    console.log("Upload...: ", req.body)
    console.log("upload..:", req.params)
    console.log("image:", req.file)
    db.images
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getImages: function (req, res) {

    console.log("Get Images..:", req.params.id)
    db.images
      .findAll({
        where: {
          walkId: req.params.id
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
  }
};
