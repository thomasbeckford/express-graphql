
module.exports = (sequelize, type) => {
  const User = sequelize.define('user', {
    first_name: {
      type: type.STRING
    },
    last_name: {
      type: type.STRING
    },
    preferred_name: {
      type: type.STRING
    },
    phone: {
      type: type.STRING
    }
  },
    {
      timestamps: true
  })

  return User
}