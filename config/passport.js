// @ts-nocheck
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import jwtSecret from './jwtConfig';

const Op = Sequelize.Op

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Patients = require('../sequelize');

passport.use('register',
  new LocalStrategy(
    {
      usernameField: 'citizen_id',
      passwordField: 'otp_ref_code',
      passReqToCallback: true,
      session: false,
    },
    (req, citizen_id, otp_ref_code, done) => {
      console.log(citizen_id);
      console.log(req.body.email);

      try {
        Patients.findOne({
          where: {
            [Op.or]: [
              {
                citizen_id,
              },
              { email: req.body.email },
            ],
          },
        }).then(patient => {
          if (patient != null) {
            console.log('Passport ID or Email are already taken');
            return done(null, false, {
              message: 'Passport ID or Email are already taken',
            });
          }
          bcrypt.hash(otp_ref_code, 12).then(hashedOTP => {
            Patients.create({
              citizen_id,
              otp_ref_code: hashedOTP,
              email: req.body.email,
            }).then(patient => {
              console.log('Patient created');
              return done(null, patient);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use('login',
  new LocalStrategy(
    {
      usernameField: 'citizen_id',
      passwordField: 'otp_ref_code',
      session: false,
    },
    (citizen_id, otp_ref_code, done) => {
      try {
        Patients.findOne({
          where: {
            citizen_id,
          },
        }).then(patient => {
          if (patient === null) {
            return done(null, false, { message: 'Invalid Citizen ID' });
          }
          bcrypt.compare(otp_ref_code, patient.otp_ref_code).then(response => {
            if (response !== true) {
              console.log('OTP do not match');
              return done(null, false, { message: 'OTP do not match' });
            }
            console.log('Patient found & Authenticated');
            return done(null, patient);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use('jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
        Patients.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then(patient => {
        if (patient) {
          console.log("Patient's Citizen ID found in database");
          done(null, patient);
        } else {
          console.log("Patient's Citizen ID didn't exist in database");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);