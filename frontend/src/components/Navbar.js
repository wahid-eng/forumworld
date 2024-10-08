import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
	const { isAuthenticated, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleLogout = (e) => {
		e.preventDefault();
		logout().then(() => {
			toast.success('Logout successfully!');
		});
	};

	const handleMouseClick = (e) => {
		e.stopPropagation();
		if (!e.target.closest('#nav-toggle')) {
			setTimeout(() => {
				setIsMenuOpen(false);
			}, 300);
		}
	};

	useEffect(() => {
		window.addEventListener('mousedown', handleMouseClick);
		return () => {
			window.removeEventListener('mousedown', handleMouseClick);
		};
	}, []);

	return (
		<>
			<nav className="bg-white shadow-md">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="text-2xl font-bold text-blue-500">
						<Link to={'/'}>Brand</Link>
					</div>
					<div className="hidden md:flex space-x-6">
						{isAuthenticated ? (
							<>
								<NavLink
									to={'/dashboard'}
									className={({ isActive }) =>
										isActive
											? 'text-blue-500 hover:text-blue-500'
											: 'text-gray-700 hover:text-blue-500'
									}
								>
									Dashboard
								</NavLink>
								<NavLink
									to={'/blog'}
									className={({ isActive }) =>
										isActive
											? 'text-blue-500 hover:text-blue-500'
											: 'text-gray-700 hover:text-blue-500'
									}
								>
									Blog
								</NavLink>
								<NavLink
									to={'/logout'}
									className="text-gray-700 hover:text-blue-500"
									onClick={handleLogout}
								>
									Logout
								</NavLink>
							</>
						) : (
							<>
								<NavLink
									to={'/login'}
									className={({ isActive }) =>
										isActive
											? 'text-blue-500 hover:text-blue-500'
											: 'text-gray-700 hover:text-blue-500'
									}
								>
									Login
								</NavLink>
								<NavLink
									to={'/register'}
									className={({ isActive }) =>
										isActive
											? 'text-blue-500 hover:text-blue-500'
											: 'text-gray-700 hover:text-blue-500'
									}
								>
									Register
								</NavLink>
							</>
						)}
					</div>

					{/* <!-- Mobile Menu Toggle --> */}
					<div className="md:hidden">
						<button
							id="nav-toggle"
							className="text-gray-700 hover:text-blue-500 focus:outline-none"
							onClick={() => setIsMenuOpen(true)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* <!-- Mobile Menu --> */}
				<div
					id="mobile-menu"
					className={`${
						isMenuOpen ? '' : 'hidden md:hidden'
					} px-4 py-4 space-y-4`}
				>
					{isAuthenticated ? (
						<>
							<NavLink
								to={'/dashboard'}
								className={({ isActive }) =>
									isActive
										? 'text-blue-500 hover:text-blue-500 block'
										: 'text-gray-700 hover:text-blue-500 block'
								}
							>
								Dashboard
							</NavLink>
							<NavLink
								to={'/blog'}
								className={({ isActive }) =>
									isActive
										? 'text-blue-500 hover:text-blue-500 block'
										: 'text-gray-700 hover:text-blue-500 block'
								}
							>
								Blog
							</NavLink>
							<NavLink
								to={'/logout'}
								className="text-gray-700 hover:text-blue-500 block"
								onClick={handleLogout}
							>
								Logout
							</NavLink>
						</>
					) : (
						<>
							<NavLink
								to={'/login'}
								className={({ isActive }) =>
									isActive
										? 'text-blue-500 hover:text-blue-500 block'
										: 'text-gray-700 hover:text-blue-500 block'
								}
							>
								Login
							</NavLink>
							<NavLink
								to={'/register'}
								className={({ isActive }) =>
									isActive
										? 'text-blue-500 hover:text-blue-500 block'
										: 'text-gray-700 hover:text-blue-500 block'
								}
							>
								Register
							</NavLink>
						</>
					)}
				</div>
			</nav>
		</>
	);
}
