import React from 'react';

export default function dashboard() {
	return (
		<>
			<div className="min-h-screen bg-gray-100">
				<div className="container mx-auto py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
						Welcome to the Dashboard
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
							<p className="text-gray-600">No recent activity to show.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Projects</h3>
							<p className="text-gray-600">You have no active projects.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Messages</h3>
							<p className="text-gray-600">No new messages.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
