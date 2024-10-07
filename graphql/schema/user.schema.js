import { AuthenticationError, gql, UserInputError } from 'apollo-server-core';
import Joi from 'joi';
import User from '../../models/user.model.js';
import Post from '../../models/post.model.js';

export const userTypeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
		posts: [Post!]!
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

	input UpdateUserPayload {
		name: String
		email: String
		password: String
	}

	type Query {
		user(id: ID!): User!
	}

	type Mutation {
		register(payload: RegisterPayload!): AuthResponse
		login(payload: LoginPayload!): AuthResponse!
		updateProfile(id: ID!, payload: UpdateUserPayload!): User!
	}
`;

export const userResolvers = {
	Query: {
		user: async (_, payload) => {
			const { error } = Joi.object({
				id: Joi.string().hex().length(24).required(),
			}).validate(payload);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const user = await User.findById(payload.id).select('-password');
				if (!user) {
					throw new Error('User not found');
				}
				return user;
			} catch (error) {
				throw new Error(error.message);
			}
		},
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
				const existingUser = await User.findOne({ email })
					.select('-password')
					.exec();
				if (existingUser) throw new UserInputError('User already exists');
				// Create and save new user
				const user = new User({ name, email, password });
				await user.save();

				// Generate JWT token
				const token = user.generateAuthToken();
				return { user, token };
			} catch (error) {
				throw new Error(error.message);
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
				throw new Error(error.message);
			}
		},

		updateProfile: async (_, args) => {
			const { error } = Joi.object({
				id: Joi.string().hex().length(24).required(),
				payload: Joi.object({
					name: Joi.string().optional(),
					email: Joi.string().email().optional(),
					password: Joi.string().min(6).optional(),
				}),
			}).validate(args);

			if (error) throw new UserInputError(error.details[0].message);

			const { name, email, password } = args.payload;

			try {
				const user = await User.findByIdAndUpdate(
					args.id,
					{ name, email, password },
					{ new: true, runValidators: true }
				)
					.select('-password')
					.exec();
				if (!user) throw new Error('User not found');
				return user;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	},

	User: {
		posts: async (parent, args) => {
			try {
				const posts = await Post.find({ author: parent.id });
				return posts;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	},
};
