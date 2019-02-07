const db = require("../models");


// Defining methods for the DogController
module.exports = {
  findOne: function (req, res) {
    db.dogOwner
      .findOne({ id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findWalker: function (req, res) {
    console.log(req.params.UserID);
    db.dogOwner.findOne({
      where: {
        userId: req.params.UserID
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    db.dogOwner
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getImagesOwner: function (req, res) {

    console.log("Get Images Owner..:", req.params.idOwner)
    db.images
      .findAll({
        include: [{
          model: db.dogOwner,
          required: true
        }

        ],
        where: {
          dogOwnerId: req.params.idOwner,

        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getOwnerWalks: function (req, res) {
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
          dogOwnerId:req.params.id // This is the id of the dog, despite the table name being dogOwner
          
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
  }
};
