module.exports = {
	getUsers: async (_, __, { models }) => {
		try {
			const users = await models.user.findAll()
			return users
		} catch (e) {
			console.log(`Error: ${e}, `)
			throw e
		}
	},
	getUserById: async (_, { id }, { models }) => {
		try {
			const users = await models.user.findByPk(id)
			return users
		} catch (e) {
			console.log(`Error: ${e}`)
			throw e
		}
	},
	userLogin: async (_, { input }, { models }) => {
		console.log(input)
		console.log(models)
	},
}
