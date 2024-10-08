import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ data }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg">
			<Link to={`/blog/${data.id}`}>
				<h3 className="text-xl font-semibold mb-4">{data.title}</h3>
			</Link>
			<p className="text-gray-600">{data.content}</p>
			<p className="mt-2">
				By <strong>{data.author.name}</strong>
			</p>
		</div>
	);
}
