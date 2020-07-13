// @ts-nocheck
module.exports = (sequelize, Sequelize) => {
  const Hospital = sequelize.define('hospitals', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    name: Sequelize.CHAR(100),
    location: Sequelize.CHAR(255),
    phone_number: Sequelize.CHAR(20),
  
    open: Sequelize.DATEONLY,
    close: Sequelize.DATEONLY,

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
  return Hospital
}