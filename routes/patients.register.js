// @ts-nocheck
import passport from 'passport';
import Patients from '../sequelize';
import {status} from '../helpers/status';

module.exports = app => {
    app.post('/api/register', (req, res, next) => {
      passport.authenticate('register', (err, patient, info) => {  
        if (err) {
          console.error(`Error ${err}`);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(status.forbidden).send(info.message);
        } else {
          req.logIn(patient, error => {
            console.log(patient);

            const data = {
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              citizen_id: patient.citizen_id,
            };
            
            console.log(data);
            Patients.findOne({
              where: {
                citizen_id: data.citizen_id,
              },
            }).then(patient => {
              console.log(patient);
              patient.update({
                  name: data.name,
                  surname: data.surname,
                  email: data.email,
                })
                .then(() => {
                  console.log('Patient created in Database');
                  res.status(status.success).send({ message: 'Patient created in Database' });
                });
            });
          });
        }
      })(req, res, next);
    });
  };