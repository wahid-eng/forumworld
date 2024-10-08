import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../utils/graphql/mutations';
import { useAuth } from '../context/AuthContext';

export default function Login() {
	const [userLogin, { loading }] = useMutation(LOGIN_MUTATION);
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		toast.promise(
			userLogin({
				variables: {
					payload: data,
				},
			}),
			{
				loading: 'Processig...',
				success: (response) => {
					reset();
					login(response);
					return 'Login success';
				},
				error: (err) => err.toString(),
			}
		);
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-1"
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								name="email"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register('email', {
									required: { value: true, message: 'Email is required' },
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Entered value does not match email format',
									},
								})}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-gray-700 font-bold mb-1"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register('password', {
									required: { value: true, message: 'Password is required' },
									minLength: {
										value: 6,
										message: 'Min length is 6',
									},
								})}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<button
							type="submit"
							disabled={loading}
							className={`w-full text-white py-2 rounded-lg focus:outline-none focus:ring-2 ${
								loading
									? 'focus:ring-blue-400 bg-blue-400 hover:bg-blue-400'
									: 'focus:ring-blue-500 bg-blue-500 hover:bg-blue-600'
							}`}
						>
							{loading ? 'Processing...' : 'Login'}
						</button>
					</form>
					<p className="text-gray-600 mt-4 text-center">
						Don't have an account?
						<Link
							to={'/register'}
							className="text-blue-500 hover:underline ms-1"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
