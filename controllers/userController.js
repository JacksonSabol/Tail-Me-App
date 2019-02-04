const db = require("../models");


// Defining methods for the walkerController
module.exports = {
  findOne: function (req, res) {
    db.user
      .findOne({ id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    var newUser = req.body;
    // console.log(newUser);
    db.user
      .create(newUser)
      .then(dbModel => res.status(200).send({ message: 'Profile created successfully' }))
      .catch(err => res.status(422).json(err));
  }
};