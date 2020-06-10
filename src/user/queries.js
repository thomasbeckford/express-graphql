module.exports = {
	getUser: async () => {
		try {
			const users = await models.User.findAll();
			return users
		} catch (e) {
			console.log(`Error: ${e}`)
			throw e
		}
	},
	getUserById: async (_, {id}, {models}) => {
		try {
			const users = await models.user.findByPk(id);
			return users
		} catch (e) {
			console.log(`Error: ${e}`)
			throw e
		}
    },
}