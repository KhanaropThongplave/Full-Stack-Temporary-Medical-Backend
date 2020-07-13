import Sequelize from 'sequelize';
import PatientsModel from './models/patient';
import HospitalModel from './models/hospital'
import InformationModel from './models/information'
import AppointmentModel from './models/appointment'
import OtpModel from './models/otp'

const sequelize = new Sequelize("medical", "postgres", "medical", {
  host: "localhost",
  dialect: "postgres",
});

const database = {}
database.Op = Sequelize.Op
database.patient = PatientsModel(sequelize, Sequelize);
database.hospital = HospitalModel(sequelize, Sequelize);
database.information = InformationModel(sequelize, Sequelize);
database.appointment = AppointmentModel(sequelize, Sequelize);
database.otp = OtpModel(sequelize, Sequelize);

sequelize.sync()

database.patient.hasMany(database.information, { foreignKey: "patient_id"});
database.information.belongsTo(database.patient, {foreignKey: "id"});

database.hospital.hasMany(database.information, { foreignKey: "source_hospital_id"});
database.information.belongsTo(database.hospital, {
  foreignKey: "id"
})

module.exports = database;
