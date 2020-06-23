module.exports = {
	createUser: async (_, { input }, { models }) => {
		try {
			const user = await models.user.create({
				first_name: input.first_name,
				last_name: input.last_name,
				preferred_name: `${input.first_name} ${input.last_name}`,
				phone: input.phone,
			})
			return {
				message: 'User created successfully',
				user,
			}
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
	updateUser: async (_, { input }, { models }) => {
		try {
			const updateUser = await models.user.update(input, { where: { id: input.id } })
			if (updateUser == 1) return { message: 'User updated successfully' }
			return { message: 'Could not update user' }
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
	deleteUser: async (_, { id }, { models }) => {
		try {
			const destroyUser = await models.user.destroy({ where: { id: id } })
			if (destroyUser == 1) return { message: 'User deleted successfully' }
			return { message: 'Could not delete user' }
		} catch (e) {
			return { message: `Error: ${e}` }
		}
	},
}
