let Users = require('./users');
let nodemailer = require('nodemailer');

var SendingMailsToUsers = {
    //Sending mails based on scheduler time function
    sendingMailsWithScheduler:()=>{
        Users.find({},{isReplayed: false}) /*mongo query to get who are not given replayed, Once given replay those user not come by using this query*/
        .then((found) => {
            //console.log('found data...',found);
            if(found){
                for(var i=0;i<found.length;i++){
                    var smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "starttasker@gmail.com",
                            pass: "Abcd1234@#"
                        }
                    });
                    mailOptions={
                        to : found[i].email,
                        subject : "Please give replay from you are account",
                        text: "Welcome to Ecosmob Technologies Pvt. Ltd"
                    }

                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if(error){
                            console.log(error);

                        }else{
                            console.log("Message sent: ");

                        }

                    });
                }
            }else{
                console.log("job done...");
            }
        }).catch(err => res.status(400).json('Error: ' + err));
    },
    //Sending mails for every 15min function
    sendingMailsForEvery15Min:()=>{
        Users.find({},{isReplayed: false})
        .then((found) => {
            console.log('found data...',found);
            if(found){
                for(var i=0;i<found.length;i++){
                    var smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "starttasker@gmail.com",
                            pass: "Abcd1234@#"
                        }
                    });
                    mailOptions={
                        to : found[i].email,
                        subject : "Please give replay from you are account",
                        text: "Welcome to Ecosmob Technologies Pvt. Ltd"
                    }
                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if(error){
                            console.log(error);

                        }else{
                            console.log("Message sent: ");
                        }
                    });
                found[i].sendMailTime = new Date().getTime().toString()
                found[i].save()
                .then(() => console.log('user data updated!'))
                .catch(() => console.log('failed to update..'));
                }
            }else{
                console.log("job done...");
            }
        }).catch(() => console.log('no data found from database'));
    }
}

module.exports = SendingMailsToUsers;