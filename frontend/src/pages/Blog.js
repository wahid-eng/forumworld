import React from 'react';

export default function Blog() {
	return (
		<>
			<div className="min-h-screen bg-gray-100">
				<div className="container mx-auto py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-6">Blogs</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Blog Title 1</h3>
							<p className="text-gray-600">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Blog Title 2</h3>
							<p className="text-gray-600">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Blog Title 3</h3>
							<p className="text-gray-600">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
