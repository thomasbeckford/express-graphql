import Sequelize from 'sequelize'
import UserModel from './models/user'

const sequelize = new Sequelize('express_graphql', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
})


UserModel(sequelize, Sequelize)

// force: true => this run drop tables
sequelize.sync().then(() => {
	console.log('Database & tables created!')
})

module.exports = {
	models: sequelize.models
}
