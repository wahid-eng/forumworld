import React from 'react';

export default function Post({ data }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg">
			<h3 className="text-xl font-semibold mb-4">{data.title}</h3>
			<p className="text-gray-600">{data.content}</p>
		</div>
	);
}
