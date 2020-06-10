import userQueries from '../user/queries'
import userMutations from '../user/mutations'

const resolvers = {
	Query: {
		...userQueries,
   },
   Mutation: {
	   ...userMutations
   }
}

export default resolvers