const db = require("../models");

module.exports = {

    createInvitation: function (req, res) {

        console.log("params...: ", req.params)
        walkerName = req.params.walkername;

        db.invitationPending
            .create({
                phoneNumber: req.params.phone,
                name: req.params.name,
                specialCode: req.params.specialcode,
                walkerId: req.params.walkerid       /// this code need to come with the state
            })
            // .then(dbModel => console.log(dbModel))
            .then(dbModel => sendSMS(dbModel, walkerName))
            .catch(err => res.status(422).json(err));


        function sendSMS(dbModel, walkerName) {
       
            require('dotenv').config();
            var id = process.env.TWILIO_ACCOUNT_SID;
            var secret = process.env.TWILIO_TOKEN;
            var phonefrom = process.env.TWILIO_PHONE_FROM;

            const client = require('twilio')(id, secret);

            // route to friends SQL table here
       
            var ownerName = dbModel.name;
            var phoneNumber = dbModel.phoneNumber;
            var urlCode = dbModel.specialCode;
            // var walkerName = req.cookie.name;
            var walkerName = walkerName;

            //I need to include in the invitation the URL with a ref with the Walker ID + the owner phonenumber and a specific login path

            var invitation = `Hi ${ownerName}, ${walkerName} has invited you to join TailMe and setup all the info about your dog. http://localhost:3000/owner/signup/${urlCode}`
       
            console.log("invitation: ", invitation);

            client.messages
                .create({
                    body: invitation,
                    from: phonefrom,
                    to: phoneNumber
                })
                .then(message => {
                    console.log(message.sid);
                    res.json(message);
                    //create a row in the  invitations pending table
                    //res.json(res)
                })
                .done(console.log("sended"));
        }
    },

}
