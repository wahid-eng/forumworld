import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<nav className="bg-white shadow-md">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="text-2xl font-bold text-blue-500">Brand</div>
					<div className="hidden md:flex space-x-6">
						{/* <!-- Use text-blue-500 for active nav items --> */}
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
					</div>

					{/* <!-- Mobile Menu Toggle --> */}
					<div className="md:hidden">
						<button
							id="nav-toggle"
							className="text-gray-700 hover:text-blue-500 focus:outline-none"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* <!-- Mobile Menu --> */}
				<div id="mobile-menu" className="hidden md:hidden px-4 py-4 space-y-4">
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
				</div>
			</nav>
		</>
	);
}
