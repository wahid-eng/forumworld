import { gql } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
	}

	type Query {
		user(id: ID!): User!
	}
`;

const resolvers = {
	Query: {
		user: (_, { id }) => ({
			id: '1',
			name: 'Mohammad Wahid',
			email: 'wahid@gmail.com',
			password: '123456',
		}),
	},
};

const userSchema = makeExecutableSchema({ typeDefs, resolvers });

export default userSchema;
