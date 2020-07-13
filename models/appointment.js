// @ts-nocheck
module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define('appointments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    date: Sequelize.DATEONLY,
    details: Sequelize.TEXT,
    status: Sequelize.TEXT,

    hospital_id: Sequelize.BIGINT,
    patient_id: Sequelize.BIGINT,
  
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
  return Appointment
}