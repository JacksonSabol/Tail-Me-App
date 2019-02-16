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

    db.user
      .findAll({
        include: [{
          model: db.dogOwner,
          required: true,
          include: [{
            model: db.walks,
            required: true,
            include: [{
              model: db.walkImages,
              required: true,
              include: [{
                model: db.images,
                required: true
              }]
            },
            ]
          },
          ]
        },
        ],
        where: {
          id: req.params.idOwner
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log(err); res.status(422).json(err) });
  },


  /* include: [
    {
      model: db.dogOwner,
      include: [{
        model: db.Walks,
        include: [{
          model: db.walkImages
        }]
      }]
    }
  ],
  where: {
    id: req.params.idOwner


  } */
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
          dogOwnerId: req.params.id // This is the id of the dog, despite the table name being dogOwner

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
