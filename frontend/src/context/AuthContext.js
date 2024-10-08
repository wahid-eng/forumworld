import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const login = (response) => {
		setIsLoading(true);
		const { token } = response?.data?.login;
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
		setIsLoading(false);
	};

	const logout = () => {
		setIsLoading(true);
		return new Promise((resolve) => {
			localStorage.removeItem('token');
			setIsAuthenticated(false);
			setIsLoading(false);
			resolve();
		});
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
