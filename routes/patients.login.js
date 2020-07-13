// @ts-nocheck
import jwt from 'jsonwebtoken';
import passport from 'passport';
import jwtSecret from '../config/jwtConfig';
import Patients from '../sequelize';
import {status} from '../helpers/status';

module.exports = app => { 
    app.post('/api/login', (req, res, next) => {
      passport.authenticate('login', (err, patients, info) => {
        if (err) {
          console.error(`Error ${err}`);
        }
        if (info !== undefined) {
          console.error(info.message);
          if (info.message === 'Invalid Username') {
            res.status(status.unauthorized).send(info.message);
          } else {
            res.status(status.forbidden).send(info.message);
          }
        } else {
          req.logIn(patients, () => {
            Patients.findOne({
              where: {  
                citizen_id: req.body.citizen_id,
              },
            }).then(patient => {
              const token = jwt.sign({ id: patient.id }, jwtSecret.secret, {
                expiresIn: 60 * 60,
              });
              res.status(status.success).send({
                auth: true,
                token,
                message: 'Patient Found & Log In Successfully',
              });
            });
          });
        }
      })(req, res, next);
    });
  };