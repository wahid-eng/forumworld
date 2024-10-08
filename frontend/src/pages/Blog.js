import { useQuery } from '@apollo/client';
import React from 'react';
import { POSTS_QUERY } from '../utils/graphql/queries';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

export default function Blog() {
	const { data, loading, error } = useQuery(POSTS_QUERY, {
		variables: { limit: 5, cursor: null },
	});

	if (error) {
		toast.error(error.message);
		return <h2>{error.message}</h2>;
	}

	if (loading && !data) {
		return <Loading />;
	}

	return (
		<>
			<div className="container mx-auto py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Blogs</h1>
			</div>
		</>
	);
}
