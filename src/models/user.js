import crypto from 'crypto'
let dataValues = []
let prevValues = []

module.exports = (sequelize, type) => {
	const User = sequelize.define(
		'user',
		{
			first_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			last_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			preferred_name: {
				type: type.STRING,
				unique: false,
				allowNull: false,
			},
			phone: {
				type: type.STRING,
				unique: false,
				allowNull: true,
			},
			email: {
				type: type.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: type.STRING,
				get() {
					return () => this.getDataValue('password')
				},
			},
			salt: {
				type: type.STRING,
				get() {
					return () => this.getDataValue('salt')
				},
			},
		},
		{
			timestamps: true,
		}
	)

	User.generateSalt = function () {
		return crypto.randomBytes(16).toString('base64')
	}
	User.encryptPassword = function (plainText, salt) {
		return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
	}

	const setSaltAndPassword = (user) => {
		if (user.changed('password')) {
			user.salt = User.generateSalt()
			user.password = User.encryptPassword(user.password(), user.salt())
		}
	}

	User.beforeCreate(setSaltAndPassword)
	User.beforeUpdate(setSaltAndPassword)

	User.addHook('afterCreate', (data) => {
		updateDatalog('Created', data._modelOptions.name.plural, null, JSON.stringify(data.dataValues))
	})
	User.addHook('afterUpdate', (data) => {
		Object.keys(data._changed).map((x) => {
			dataValues.push({ [x]: data.dataValues[x] })
			prevValues.push({ [x]: data._previousDataValues[x] })
		})
		updateDatalog('Updated', data._modelOptions.name.plural, JSON.stringify(prevValues), JSON.stringify(dataValues))
	})
	User.addHook('afterDestroy', (data) => {
		updateDatalog('Deleted', data._modelOptions.name.plural, JSON.stringify(data.dataValues), null)
	})

	const updateDatalog = async (action, table, oldValues, newValues) => {
		const data = { action, table, oldValues, newValues }
		await sequelize.models.datalog.create(data)
	}

	return User
}
