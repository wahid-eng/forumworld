import React from 'react';

export default function Login() {
	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<form>
						<div className="mb-4">
							<label for="email" className="block text-gray-700">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter your email"
							/>
							{/* <!-- Add validation error message --> */}
							{/* <!-- <p className="text-red-500 text-sm mt-2">Email is required</p> --> */}
						</div>
						<div className="mb-6">
							<label for="password" className="block text-gray-700">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter your password"
							/>
							{/* <!-- Add validation error message --> */}
							{/* <!-- <p className="text-red-500 text-sm mt-2">Password is required</p> --> */}
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Login
						</button>
					</form>
					<p className="text-gray-600 mt-4 text-center">
						Don't have an account?{' '}
						<a href="/register" className="text-blue-500 hover:underline">
							Register
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
