const db = require("../models");

module.exports = {

    // need to clean the code to make one API call for twilio with invitation body and phoneTO, to be called from any other function.. This fuction will be called from: server reminders, createInvitation, alert walker a customer has signed up,...

    createTextInvitation: function (req, res) {

        console.log("params from global controller: ", req.params)
        walkerName = req.params.walkername;

        db.invitationPending
            .create({
                phoneNumber: req.params.phone,
                name: req.params.name,
                specialCode: req.params.specialcode,
                walkerId: req.params.walkerid       /// this code need to come with the state
            })
            // .then(dbModel => console.log("From invitationPending in globalcontroller: ", dbModel))
            .then(dbModel => sendSMSowner(dbModel, walkerName))
            .catch(err => res.status(422).json(err));


        function sendSMSowner (dbModel, walkerName) {
       
            require('dotenv').config();
            var id = process.env.TWILIO_ACCOUNT_SID;
            var secret = process.env.TWILIO_TOKEN;
            var phonefrom = process.env.TWILIO_PHONE_FROM;

            const client = require('twilio')(id, secret);

            // route to friends SQL table here
       
            var ownerName = dbModel.name;
            var phoneNumber = dbModel.phoneNumber;
            var urlCode1 = dbModel.walkerId;
            var urlCode2 = dbModel.specialCode;
            // var walkerName = req.cookie.name;
            var walkerName = walkerName;

            //I need to include in the invitation the URL with a ref with the Walker ID + the owner phonenumber and a specific login path

            var invitation = `Hi ${ownerName}, ${walkerName} has invited you to join TailMe and setup all the info about your dog. https://tail-me.herokuapp.com/owner/signup/${urlCode1}/${urlCode2}`
       
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

    createOwner: function (req, res) {
        //inputs: userId (owner) + specialcode: if scpecialcode = 0 (create dogowner), if !0 create dogowner + clean the pendinginvitatios + send sms to walker telling the owner signup

        console.log("params...: ", req.params)
        var ownerUserId = req.params.owneruserid;  // this is coming from the user table created during the signup process
        var specialCode = req.params.specialcode;  // this is coming from the URL signup route
        var walkerId = req.params.walkerid;        // this is coming from the URL signup route

        db.dogOwner
            .create({
                userId: ownerUserId,
                walkerId: walkerId,
                emergencyContact: `+1${specialCode}`
            })
            // .then(dbModel => console.log(dbModel))
            .then(dbModel =>{
                db.invitationPending
                .destroy({where: {
                    specialCode: specialCode
                  }
                })
                .then(dbModel => console.log(dbModel))
                // .then(dbModel => sendSMSwalker(data))
                .catch(err => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err));

      

            /// this will be implemented if the Walker has phone number in the user table or in the walker table to informed the person that a customer has signup
        function sendSMSwalker(data) {
       
            require('dotenv').config();
            var id = process.env.TWILIO_ACCOUNT_SID;
            var secret = process.env.TWILIO_TOKEN;
            var phonefrom = process.env.TWILIO_PHONE_FROM;

            const client = require('twilio')(id, secret);

            // route to friends SQL table here
       
            var ownerName = data.ownerName;
            var walkerPhoneNumber = data.walkerPhoneNumber;
            // var walkerName = req.cookie.name;
            var walkerName = data.walkerName;

            var invitation = `Hi ${walkerName}, your customer: ${ownerName}, has finished the sign up process`
       
            console.log("invitation: ", invitation);

            client.messages
                .create({
                    body: invitation,
                    from: walkerPhoneNumber,
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