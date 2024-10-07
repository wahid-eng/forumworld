import { gql, UserInputError } from 'apollo-server-core';
import Joi from 'joi';
import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';

export const postTypeDefs = gql`
	type Post {
		id: ID!
		title: String!
		content: String!
		author: User!
	}

	input PostCreatePayload {
		title: String!
		content: String!
		author: String!
	}

	type Query {
		posts: [Post!]!
		post(id: ID!): Post!
	}

	type Mutation {
		createPost(payload: PostCreatePayload!): Post!
	}
`;

export const postResolvers = {
	Query: {
		posts: async () => await Post.find(),
		post: async (_, { id }) => await Post.findById(id),
	},
	Mutation: {
		createPost: async (_, { payload }) => {
			const { error } = Joi.object({
				title: Joi.string().required(),
				content: Joi.string().required(),
				author: Joi.string().hex().length(24).required(),
			}).validate(payload);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const { title, content, author } = payload;
				const user = await User.findById(author);
				if (!user) throw new UserInputError('User not found');

				const post = new Post({ title, content, author });
				await post.save();
				return post;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	},
	Post: {
		author: async (parent, args) => {
			try {
				const user = await User.findById(parent.author);
				if (!user) throw new Error('User not found');
				return user;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	},
};
