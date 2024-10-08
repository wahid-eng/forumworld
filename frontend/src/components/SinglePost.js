import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SINGLE_POST_QUERY } from '../utils/graphql/queries';
import toast from 'react-hot-toast';
import Loading from './Loading';

export default function SinglePost() {
	const { id } = useParams();
	const { data, error, loading } = useQuery(SINGLE_POST_QUERY, {
		variables: { getPostId: id },
	});

	if (error) {
		toast.error(error.message);
		return <h2>{error.message}</h2>;
	}

	if (loading && !data) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen container mx-auto py-8">
			<h2>{data.getPost.title}</h2>
			<p>{data.getPost.content}</p>
		</div>
	);
}
