// @ts-nocheck
import database from '../sequelize';

const Hospital = database.hospital
const Information = database.information
const Op = database.Op

exports.createHospital = (req, res) => {
    const hospital = {
        name: req.body.name,
        location: req.body.location,
        phone_number: req.body.phone_number,
        open: req.body.open,
        close: req.body.close
    }
    
    Hospital.create(hospital)
    .then(() => {
        console.log("Hospital was created successfully!")
        return res.status(200).send({
            message: "Hospital waas created successfully!"
        });
    }).catch((err) => {
        console.log("Error occured while creating Hospital")
        return res.status(500).send({
            message: err.message || "Error occured while creating Hospital"
        });
    });
};

exports.getOneHospital = (req, res) => {
    const id = req.params.id;

    Hospital.findByPk(id, {
        include: [{
            model: Information}]
        })
        .then((data) => {
            console.log("Retrieving one Hospital successfully!")
            return res.status(200).send(data);
        }).catch((err) => {
            console.log(`Some error occuered while retrieving a Hospital with id ${id}`)
            return res.status(500).send({
                message: err.message || `Some error occuered while retrieving a Hospital with id ${id}`
            });
        });
};

exports.getAllHospital = (req, res) => {
    Hospital.findAll({
        include: [{
            model: Information}]
        })
        .then(data => {
            console.log("Retrieving All Hospital successfully!")
            return res.send(data);
        }).catch((err) => {
            console.log("Some error occured while retrieving all Hospital")
            return res.status(500).send({
                message: err.message || "Some error occured while retrieving all Hospital"
            });
        });
};

exports.updateOneHospital = (req, res) => {
  const id = req.params.id;

  Hospital.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      console.log("Hospital was updated successfully!")
      return res.send({
        message: "Hospital was updated successfully!"
      });
    } else {
      console.log(`Cannot update Hospital with id=${id}. Maybe Hospital was not found`)
      return res.send({
        message: `Cannot update Hospital with id=${id}. Maybe Hospital was not found`
      });
    }
  })
  .catch(err => {
    console.log("Error updating Hospital with id=" + id)
    return res.status(500).send({
      message: "Error updating Hospital with id=" + id
    });
  });
};

exports.deleteOneHospital = (req, res) => {
    const id = req.params.id;

    Hospital.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("One Hospital was deleted successfully!")
          return res.send({
            message: "One Hospital was deleted successfully!"
          });
        } else {
          console.log(`Cannot delete Hospital with id=${id}. Maybe Hospital was not found!`)
          return res.send({
            message: `Cannot delete Hospital with id=${id}. Maybe Hospital was not found!`
          });
        }
      })
      .catch(err => {
        console.log("Error deleting Hospital with id=" + id)
        return res.status(500).send({
          message: "Error deleting Hospital with id=" + id
        });
      });
};

exports.deleteAllHospital = (req, res) => {
    Hospital.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      console.log("All Hospital was deleted successfully!")
      return res.send({ message: "All Hospital was deleted successfully!" });
    })
    .catch(err => {
      console.log("Some error occurred while deleting all Hospital.")
      return res.status(500).send({
        message:
        err.message || "Some error occurred while deleting all Hospital."
    });
  });
};

