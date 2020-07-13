// @ts-nocheck
module.exports = (sequelize, Sequelize) =>  {
  const Information = sequelize.define('informations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    source_hospital_id: Sequelize.BIGINT,
    destination_hospital_id: Sequelize.BIGINT,
    personal_information: Sequelize.ENUM('Yes', 'No'),
    diagnose_desease: Sequelize.ENUM('Yes', 'No'),
    treatment_information: Sequelize.ENUM('Yes', 'No'),
    photo: Sequelize.ENUM('Yes', 'No'),

    start_date: Sequelize.DATEONLY,
    end_date: Sequelize.DATEONLY,

    status: Sequelize.ENUM('Wait for source confirm', 'Wait for destination confirm', 'Confirmed', 'Rejected'),

    patient_id: Sequelize.BIGINT,
    destination_staff_id: Sequelize.BIGINT,
    source_staff_id: Sequelize.BIGINT,

    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    deletedAt: 'TIMESTAMP'
  })
  return Information
}