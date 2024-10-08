import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../utils/graphql/mutations';

export default function Register() {
	const [userRegister, { loading }] = useMutation(REGISTER_MUTATION);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		toast.promise(
			userRegister({
				variables: {
					payload: data,
				},
			}),
			{
				loading: 'Processig...',
				success: (response) => {
					const { token } = response?.data?.register;
					sessionStorage.setItem('_token', token);
					reset();
					navigate('/login');
					return 'Registration success';
				},
				error: (err) => err.toString(),
			}
		);
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-bold mb-1"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register('name', {
									required: { value: true, message: 'Name is required' },
									minLength: {
										value: 3,
										message: 'Min length is 3',
									},
									maxLength: {
										value: 20,
										message: 'Min length is 20',
									},
								})}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message}
								</p>
							)}
						</div>
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
								type="text"
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
							{loading ? 'Processing...' : 'Register'}
						</button>
					</form>
					<p className="text-gray-600 mt-4 text-center">
						Already have an account?
						<Link to={'/login'} className="text-blue-500 hover:underline ms-1">
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
