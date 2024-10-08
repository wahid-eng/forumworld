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
