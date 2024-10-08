import { gql, UserInputError } from 'apollo-server-core';
import Joi from 'joi';
import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';
import { isAuthenticated } from '../auth.js';

export const postTypeDefs = gql`
	type Post {
		id: ID!
		title: String!
		content: String!
		author: User!
	}

	type PostsResponse {
		posts: [PostEdge]
		pageInfo: PageInfo
	}

	type PostEdge {
		post: Post
		cursor: String
	}

	type PageInfo {
		endCursor: String
		hasNextPage: Boolean
	}

	type DeleteResponse {
		success: Boolean!
		message: String!
	}

	input PostCreatePayload {
		title: String!
		content: String!
		author: String!
	}

	input PostUpdatePayload {
		title: String
		content: String
		author: String
	}

	type Query {
		getPosts(limit: Int, cursor: String): PostsResponse
		getPost(id: ID!): Post!
	}

	type Mutation {
		createPost(payload: PostCreatePayload!): Post!
		updatePost(id: ID!, payload: PostUpdatePayload!): Post!
		deletePost(id: ID!): DeleteResponse!
	}
`;

export const postResolvers = {
	Query: {
		getPosts: async (_, args, context) => {
			isAuthenticated(context);
			const { limit, cursor } = args;
			const query = {};

			// If "cursor" is provided, use it as a cursor to start fetching after a specific id
			if (cursor) {
				query._id = { $gt: cursor };
			}

			const postsQuery = await Post.find(query).limit(limit).sort({ _id: 1 }); // Sort by _id to maintain consistent order
			const posts = postsQuery.map((post) => ({
				post,
				cursor: post._id, // Use the post's _id as the cursor
			}));

			const hasNextPage = postsQuery.length === limit; // Check if there's more data
			const endCursor =
				postsQuery.length > 0 ? postsQuery[postsQuery.length - 1]._id : null;

			return { posts, pageInfo: { hasNextPage, endCursor } };
		},
		getPost: async (_, payload, context) => {
			isAuthenticated(context);
			const { error } = Joi.object({
				id: Joi.string().hex().length(24).required(),
			}).validate(payload);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const { id } = payload;
				const post = await Post.findById(id);
				if (!post) throw new Error('No post found');
				return post;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	},
	Mutation: {
		createPost: async (_, { payload }, context) => {
			isAuthenticated(context);
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
		updatePost: async (_, args, context) => {
			isAuthenticated(context);
			const { error } = Joi.object({
				id: Joi.string().hex().length(24).required(),
				payload: Joi.object({
					title: Joi.string().optional(),
					content: Joi.string().optional(),
					author: Joi.string().hex().length(24).optional(),
				}),
			}).validate(args);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const { id } = args;
				const { title, content, author } = args.payload;

				if (author) {
					const user = await User.findById(author);
					if (!user) throw new UserInputError('User not found');
				}

				const post = await Post.findByIdAndUpdate(
					id,
					{ title, content, author },
					{ new: true, runValidators: true }
				);

				return post;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		deletePost: async (_, args, context) => {
			isAuthenticated(context);
			const { error } = Joi.object({
				id: Joi.string().hex().length(24).required(),
			}).validate(args);

			if (error) throw new UserInputError(error.details[0].message);

			try {
				const post = await Post.findByIdAndDelete(args.id);
				if (!post) throw new Error('Post not found');
				return {
					success: true,
					message: 'Post successfully deleted',
				};
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
