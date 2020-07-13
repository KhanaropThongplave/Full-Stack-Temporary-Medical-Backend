// @ts-nocheck
module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('patients', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: Sequelize.CHAR(100),
    surname: Sequelize.CHAR(100),
    date_of_birth: Sequelize.DATEONLY,
    country: Sequelize.CHAR(100),
    address: Sequelize.CHAR(255),

    email: {
      type: Sequelize.CHAR(100),
      allowNull: false,
    },
    citizen_id: {
      type: Sequelize.CHAR(100),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.CHAR(20),
      allowNull: false, 
    },

    otp_ref_code: Sequelize.CHAR(6),
    
    reset_password_token: Sequelize.STRING,
    reset_password_expires: Sequelize.DATE,

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
  return Patient
}