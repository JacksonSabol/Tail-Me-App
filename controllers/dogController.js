const db = require("../models");


// Defining methods for the DogController
module.exports = {
  findOne: function (req, res) {
    db.dogOwner
      .findOne({id: req.params.id })
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
          dogOwnerId:req.params.idOwner,
          
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
