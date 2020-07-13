// @ts-nocheck
module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define('otps', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  
      otp_ref_code: {
        type: Sequelize.CHAR(6),
        allowNull: false,
      },

      phone_number: {
        type: Sequelize.CHAR(20),
        allowNull: false,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    })
    return Otp
}