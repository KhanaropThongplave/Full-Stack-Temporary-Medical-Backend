// @ts-nocheck
import database from '../sequelize'

const Patient = database.patient
const Otp = database.otp
const Information = database.information
const Op = database.Op

exports.registerPatientStep1 = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      
    try {
      Patient.findOne({
        where: {
          [Op.or]: [
            { citizen_id: req.body.citizen_id},
            { email: req.body.email },
          ],
        },
      }).then(patient => {
        if (patient != null) {
          console.log('Citizen ID or Email are already taken');
          return res.status(200).send({
            message: "Citizen ID or Email are already taken"
          });
        } else {
         Otp.create({
           otp_ref_code: Math.floor(100000 + Math.random() * 900000),
           status: 0,
           phone_number: req.body.phone_number,
         }).then(otp => {
          console.log('Otp was created successfully!');
          return res.status(200).send({
            message: otp.otp_ref_code,
          });
         })
        }
      })
    } catch (err) {
      return console.error(err)
    }
};

exports.registerPatientStep2 = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    Otp.findOne({
      where: {
        [Op.or]: [
          { otp_ref_code: req.body.otp_ref_code},
          { phone_number: req.body.phone_number },
          { status: 0 },
        ],
      }}).then(patient => {
        if (patient.length == 0) {
          console.log('OTP Incorrect');
          return res.status(200).send({
            message: "OTP Incorrect"
          });
        } else {
            Patient.create({
              name: req.body.name,
              surname: req.body.surname,
              date_of_birth: req.body.date_of_birth,
              country: req.body.country,
              citizen_id: req.body.citizen_id,
              otp_ref_code: req.body.otp_ref_code,
              email: req.body.email,
              phone_number: req.body.phone_number
            }).then(patient => {
              console.log("Create but not update")
              Otp.update(
                {status: 1},
                {where: 
                  [
                    { otp_ref_code: req.body.otp_ref_code},
                    { phone_number: req.body.phone_number },
                  ]
                }
              ).then(otp => {
                console.log('Patient was created successfully!');
                return res.status(200).send({
                message: "Register Complete!"
                });
              }).catch(err => {
                return console.error(err)
              }); 
            })
        }
      })
    }

exports.loginPatient = (req, res) => {
  try {
    Patient.findOne({
      where: {
        citizen_id: req.body.citizen_id,
        otp_ref_code: req.body.otp_ref_code
      },
    }).then(patient => {
      if (patient === null) {
        console.log("Invalid Citizen ID or OTP")
        return res.status(200).send({
          message: "Invalid Citizen ID or OTP"
        });
      } else {
        console.log('Patient Found & Login');
        return res.status(200).send({
          message: "Patient Found & Login"
        });
      }
    });
  } catch (err) {
    return console.error(err)
  }
}

exports.getOnePatient = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id, {
    include: [{
        model: Information}]
    })
    .then(data => {
      console.log("Retrieving one Patient successfully!")
      return res.send(data);
    })
    .catch(err => {
      return res.status(201).send({
        'status': true,
        'code': 201,
        'message': "Patient Not Found"
      });
    });
};


exports.getAllPatient = (req, res) => {
    Patient.findAll({
      include: [{
          model: Information 
        }]
      })
      .then(data => {
        console.log("Retrieving all Patient successfully!")
        return res.send(data);
      })
      .catch(err => {
        console.log("Some error occurred while retrieving all Patient.")
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all Patient."
        });
      });

};

exports.updateOnePatient = (req, res) => {
  const id = req.params.id;

  Patient.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      console.log("Patient was updated successfully!")
      return res.send({
        message: "Patient was updated successfully!"
      });
    } else {
      console.log(`Cannot update Patient with id=${id}. Maybe Patient was not found`)
      return res.send({
        message: `Cannot update Patient with id=${id}. Maybe Patient was not found`
      });
    }
  })
  .catch(err => {
    console.log("Error updating Patient with id=" + id)
    return res.status(500).send({
      message: "Error updating Patient with id=" + id
    });
  });
};

exports.deleteOnePatient = (req, res) => {
  const id = req.params.id;
  const timestamp = new Date().getTime();

  Patient.update(
    {deletedAt: timestamp},
    {where: { id: id }}
  ).then(num => {  
      if (num == 1) {
        console.log("One Patient was deleted successfully!")
        return res.send({
          message: "One Patient was deleted successfully!"
        });
      } else {
        console.log(`Cannot delete Patient with id=${id}. Maybe Patient was not found!`)
        return res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
        });
      }
    })
    .catch(err => {
      console.log("Error deleting Patient with id=" + id)
      return res.status(500).send({
        message: "Error deleting Patient with id=" + id
      });
    });
};

exports.deleteAllPatient = (req, res) => {
  const timestamp = new Date().getTime();

  Patient.update(
    {deletedAt: timestamp},
    {where: {}},
    {truncate: false}
  )
  .then(nums => {
    console.log("All Patient was deleted successfully!")
    return res.send({ message: "All Patient was deleted successfully!" });
  })
  .catch(err => {
    console.log("Some error occurred while deleting all Patient.")
    return res.status(500).send({
      message:
        err.message || "Some error occurred while deleting all Patient."
    });
  });
};
