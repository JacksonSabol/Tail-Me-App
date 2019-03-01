module.exports = app => {
    // Import dependencies and models
    require('dotenv').config();
    const nodemailer = require('nodemailer');
    var db = require("../models");

    // Set up connection to TailMe gmail account
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    // Post route to invite clients via email
    app.post('/mail/invite', (req, res, next) => {
        const walkerName = req.body.walkerName;
        db.invitationPending
            .create({
                phoneNumber: req.body.email,
                name: req.body.ownerName,
                specialCode: 4158675309,
                walkerId: req.body.walkerId
            })
            .then(dbModel => {
                // Define varables to be used in the automated message
                const userEmail = dbModel.phoneNumber;
                const ownerName = dbModel.name;
                const urlCode1 = dbModel.walkerId;
                const urlCode2 = dbModel.specialCode;

                // Define message for nodemailer
                const mailOptions = {
                    from: `Automated Message, Do Not Reply - mailtailme@gmail.com`,
                    to: `${userEmail}`,
                    subject: `Invitation to join TailMe - A dog-walking management application`,
                    text:
                        `Hi ${ownerName}, TailMe user "${walkerName}" has invited you to join TailMe to help them manage their walking schedule with your dog.\n` +
                        `Please click on the following link, or paste this into your browser to complete the process:\n` +
                        `https://tail-me.herokuapp.com/owner/signup/${urlCode1}/${urlCode2}\n\n` +
                        `If you do not recognize this person, or if you are not currently employing the services of a professional dog walker, please ignore this email.\n\n` +
                        `Kind regards,\n-Team TailMe`,
                };
                // Send mail to client
                transporter.sendMail(mailOptions, function (err, response) {
                    if (err) {
                        console.error('there was an error: ', err);
                    } else {
                        console.log('here is the res: ', response);
                        res.status(200).json('Invite email sent');
                    }
                });
            })
            // .catch(err => res.status(422).json(err));
            .catch(err => console.log(err));
    });
    // Post route to send walk notes to owner
    app.post('/mail/notes', (req, res, next) => {
        // Define varables to be used in the automated message
        const walkerName = req.body.walkerName;
        const walkerEmail = req.body.walkerEmail;
        const ownerEmail = req.body.ownerEmail;
        const subject = req.body.subject;
        const message = req.body.notes;

        // Define message for nodemailer
        const mailOptions = {
            from: {
                name: walkerName,
                address: walkerEmail
            },
            to: `${ownerEmail}`,
            cc: [{
                name: walkerName,
                address: walkerEmail
            }],
            subject: `TailMe - ${subject}`,
            text: message
        };
        console.log(mailOptions);
        // Send mail to client
        transporter.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('Notes email sent');
            }
        });
    })
};
