// @ts-nocheck
import database from '../sequelize';

const Information = database.information
const Op = database.Op

exports.createInformation = (req, res) => {
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
    
    Information.create(information)
    .then((data) => {
        console.log("Information was created successfully")
        return res.status(200).send({
            message: "Information was created successfully"
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Error occured while creating an Information"
        });
    });
};

exports.getAllInformation = (req, res) => {
    Information.findAll()
        .then(data => {
            console.log("Retrieving one Information successfully!")
            return res.send(data);
        }).catch((err) => {
            console.log("Some error occured while retrieving all Information")
            return res.status(500).send({
                message: err.message || "Some error occured while retrieving all informations"
            });
        });
};

exports.getOneInformation = (req, res) => {
    Information.findByPk(req.body.id)
        .then((data) => {
            console.log("Retrieving all Information successfully!")
            return res.status(200).send(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || `Some error occuered while retrieving an information by id ${id}`
            });
        });

};

exports.updateOneInformation = (req, res) => {
    const id = req.params.id;

    Information.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        console.log("Information was updated successfully!")
        return res.send({
          message: "Information was updated successfully!"
        });
      } else {
        console.log(`Cannot update Information with id=${id}. Maybe Information was not found`)
        return res.send({
          message: `Cannot update Information with id=${id}. Maybe Information was not found`
        });
      }
    })
    .catch(err => {
      console.log("Error updating Information with id=" + id)
      return res.status(500).send({
        message: "Error updating Information with id=" + id
      });
    });
};

exports.deleteOneInformation = (req, res) => {
    const id = req.params.id;

    Information.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("One Information was deleted successfully!")
          return res.send({
            message: "One Information was deleted successfully!"
          });
        } else {
          console.log(`Cannot delete Information with id=${id}. Maybe Information was not found!`)
          return res.send({
            message: `Cannot delete Information with id=${id}. Maybe Information was not found!`
          });
        }
      })
      .catch(err => {
        console.log("Error deleting Information with id=" + id)
        return res.status(500).send({
          message: "Error deleting Information with id=" + id
        });
      });
};

exports.deleteAllInformation = (req, res) => {
    Information.destroy({
        where: {},
        truncate: false
      })
      .then(nums => {
        console.log("All Information was deleted successfully!")
        return res.send({ message: "All Information was deleted successfully!" });
      })
      .catch(err => {
        console.log("Some error occurred while deleting all Information.")
        return res.status(500).send({
          message:
          err.message || "Some error occurred while deleting all Information."
      });
    });
};
