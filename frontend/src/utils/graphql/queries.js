import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
	query GetPosts($limit: Int, $cursor: String) {
		getPosts(limit: $limit, cursor: $cursor) {
			posts {
				post {
					id
					title
					content
					author {
						id
						name
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;

export const SINGLE_POST_QUERY = gql`
	query GetPost($getPostId: ID!) {
		getPost(id: $getPostId) {
			title
			content
			author {
				id
				name
			}
		}
	}
`;
