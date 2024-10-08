import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (response) => {
		const { token } = response?.data?.login;
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		return new Promise((resolve) => {
			localStorage.removeItem('token');
			setIsAuthenticated(false);
			resolve();
		});
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
