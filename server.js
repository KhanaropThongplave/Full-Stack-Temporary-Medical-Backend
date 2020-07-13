import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

const app = express();

require('./config/passport')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())

//require("./routes/patients.login.js")(app);
//require("./routes/patients.register.js")(app);
require("./routes/routes.js")(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});

module.exports = app









//var messagebird = require('messagebird')('uZssIlsQr7e99TvmadRgsdXvO');
/*
var params = {
  'originator': 'MessageBird',
  'recipients': [
    '+66984644145',
  ],
  'body': 'Test OTP Smart City Project'
};

messagebird.messages.create(params, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});
*/