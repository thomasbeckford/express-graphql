import Sequelize from 'sequelize'
import UserModel from './models/user'
const pino = require('pino')
const logger = pino({ prettyPrint: { colorize: true } })

const sequelize = new Sequelize('express_graphql', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
})
// Add models
UserModel(sequelize, Sequelize)

sequelize.addHook('beforeCreate', () => {
	console.log('Global before create hook')
})

sequelize.addHook('afterCreate', () => {
	console.log('Global after create hook')
})

// force: true => this run drop tables
sequelize.sync().then(() => {
	logger.info('Migration: database & tables created!')
})

module.exports = {
	models: sequelize.models,
	currentUserId: 1,
}
