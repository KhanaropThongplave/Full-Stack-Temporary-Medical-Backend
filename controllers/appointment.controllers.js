// @ts-nocheck
import database from '../sequelize';

const Appointment = database.appointment
const Op = database.Op

exports.createAppointment = (req, res) => {
    const information = {
        source_hospital_id: req.body.source_hospital_id,
        destination_hospital_id: req.body.destination_hospital_id,
        personal_information: req.body.personal_information,
        diagnose_the_disease: req.body.diagnose_the_disease,
        treatment_information: req.body.treatment_information,
        photo: req.body.photo,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        status: req.body.status,
        patient_id: req.body.patient_id,
        source_staff_id: req.body.source_staff_id,
        destination_staff_id: req.body.destination_staff_id,
    }
    
    Appointment.create(information)
    .then((data) => {
        console.log("Appointment was created successfully!")
        return res.status(200).send({
            message: "Appointment was created successfully!"
        });
    }).catch((err) => {
        console.log("Error occured while creating an Appointment")
        return res.status(500).send({
            message: err.message || "Error occured while creating an Appointment"
        });
    });
};

exports.getAllAppointment = (req, res) => {
    Appointment.findAll()
    .then(data => {
        console.log("Retrieving one Appointment successfully!")
        return res.send(data);
    }).catch((err) => {
        console.log("Some error occured while retrieving all Appointment")
        return res.status(500).send({
            message: err.message || "Some error occured while retrieving all Appointment"
        });
    });
};

exports.getOneAppointment = (req, res) => {
    const id = req.params.id;

    Appointment.findByPk(id)
    .then((data) => {
        console.log("Retrieving all Appointment successfully!")
        return res.status(200).send(data);
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || `Some error occuered while retrieving an Appointment by id ${id}`
        });
    });

};

exports.updateOneAppointment = (req, res) => {
    const id = req.params.id;

    Appointment.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        console.log("Appointment was updated successfully!")
        return res.send({
          message: "Appointment was updated successfully!"
        });
      } else {
        console.log(`Cannot update Appointment with id=${id}. Maybe Appointment was not found`)
        return res.send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found`
        });
      }
    })
    .catch(err => {
      console.log("Error updating Appointment with id=" + id)
      return res.status(500).send({
        message: "Error updating Appointment with id=" + id
      });
    });
};

exports.deleteOneAppointment = (req, res) => {
    const id = req.params.id;

    Appointment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("One Appointment was deleted successfully!")
          return res.send({
            message: "One Appointment was deleted successfully!"
          });
        } else {
          console.log(`Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`)
          return res.send({
            message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
          });
        }
      })
      .catch(err => {
        console.log("Error deleting Appointment with id=" + id)
        return res.status(500).send({
          message: "Error deleting Appointment with id=" + id
        });
      });
};

exports.deleteAllAppointment = (req, res) => {
    Appointment.destroy({
        where: {},
        truncate: false
      })
      .then(nums => {
        console.log("All Appointment was deleted successfully!")
        return res.send({ message: "All Appointment was deleted successfully!" });
      })
      .catch(err => {
        console.log("Some error occurred while deleting all Appointment.")
        return res.status(500).send({
          message:
          err.message || "Some error occurred while deleting all Appointment."
      });
    });
};
