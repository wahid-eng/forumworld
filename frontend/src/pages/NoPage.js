import React from 'react';

export default function NoPage() {
	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-red-500">404</h1>
					<p className="text-2xl text-gray-800 mt-4">Page Not Found</p>
					<a
						href="/"
						className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
					>
						Go to Home
					</a>
				</div>
			</div>
		</>
	);
}
