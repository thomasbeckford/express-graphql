import models from '../sequelize'

module.exports = {
	createUser: async (_, {input} ) => {
		try {
            console.log(input)
            const user = await models.User.create({
                first_name: input.first_name,
                last_name: input.last_name,
                preferred_name: input.first_name + " " +input.last_name,
                phone: input.phone,
              })
            
            console.log("User created")
            return user

		} catch (e) {
			console.log(`Error: ${e}`)
			throw e
		}
    },
}