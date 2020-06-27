import * as bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config'

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
		const user = await models.user.findOne({
			where: { email: input.email },
		})
		if (!user) {
			return { message: 'Please check your credentials' }
		}
		const valid = await bcrypt.compare(input.password, user.password)
		if (!valid) {
			return { message: 'Please check your credentials' }
		}

		// TODO: Create a persistent session with access and refresh token id?
		const refreshToken = sign({ userId: user.id, count: user.count }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
		const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15min' })

		// TODO: Set cookies!
		// res.cookie('refresh-token', refreshToken)
		// res.cookie('access-token', accessToken)

		return {
			message: 'User logged in successfully',
			user,
		}
	},
}
