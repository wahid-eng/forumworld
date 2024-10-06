import { AuthenticationError, gql, UserInputError } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Joi from 'joi';
import User from '../../models/user.model.js';

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
	}

	type AuthResponse {
		user: User!
		token: String!
	}

	input LoginPayload {
		email: String!
		password: String!
	}

	input RegisterPayload {
		name: String!
		email: String!
		password: String!
	}

	type Query {
		user(id: ID!): User!
	}

	type Mutation {
		register(payload: RegisterPayload!): AuthResponse!
		login(payload: LoginPayload!): AuthResponse!
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
	Mutation: {
		register: async (_, { payload }) => {
			const { error } = Joi.object({
				name: Joi.string().required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required(),
			}).validate(payload);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const { name, email, password } = payload;
				const existingUser = await User.findOne({ email });
				if (existingUser) throw new UserInputError('User already exists');
				// Create and save new user
				const user = new User({ name, email, password });
				await user.save();

				// Generate JWT token
				const token = user.generateAuthToken();
				return { user, token };
			} catch (error) {
				// Handle Mongoose validation errors
				throw new UserInputError(error.message);
			}
		},

		login: async (_, { payload }) => {
			const { error } = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required(),
			}).validate(payload);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const { email, password } = payload;
				const user = await User.findOne({ email });
				if (!user || !(await user.comparePassword(password)))
					throw new AuthenticationError('Invalid credentials');

				// Generate JWT token
				const token = user.generateAuthToken();
				return { user, token };
			} catch (error) {
				throw new AuthenticationError(error.message);
			}
		},
	},
};

const userSchema = makeExecutableSchema({ typeDefs, resolvers });

export default userSchema;
