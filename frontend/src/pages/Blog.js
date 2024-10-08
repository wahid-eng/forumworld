import { useQuery } from '@apollo/client';
import React from 'react';
import { POSTS_QUERY } from '../utils/graphql/queries';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';

export default function Blog() {
	const { data, loading, error, fetchMore } = useQuery(POSTS_QUERY, {
		variables: { limit: 3, cursor: null },
		notifyOnNetworkStatusChange: true,
	});

	const loadMorePosts = () => {
		fetchMore({
			variables: {
				cursor: data.getPosts.pageInfo.endCursor,
				limit: 3,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return previousResult;

				return {
					getPosts: {
						__typename: previousResult.getPosts.__typename,
						posts: [
							...previousResult.getPosts.posts,
							...fetchMoreResult.getPosts.posts,
						],
						pageInfo: fetchMoreResult.getPosts.pageInfo,
					},
				};
			},
		});
	};

	if (error) {
		toast.error(error.message);
		return <h2>{error.message}</h2>;
	}

	if (loading && !data) {
		return <Loading />;
	}

	return (
		<>
			<div className="min-h-screen container mx-auto py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Blogs</h1>
				<InfiniteScroll
					dataLength={data.getPosts.posts.length}
					next={loadMorePosts}
					hasMore={data.getPosts.pageInfo.hasNextPage}
					loader={<h4>Loading...</h4>}
					endMessage={<p>No posts.</p>}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{data.getPosts.posts.map(({ post }) => (
						<Post data={post} key={post.id} />
					))}
				</InfiniteScroll>
			</div>
		</>
	);
}
