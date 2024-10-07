import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (context) => {
	if (!context.user) {
		throw new AuthenticationError(
			'You must be logged in to perform this action.'
		);
	}
};

export const getUserFromToken = (token) => {
	if (!token) return null;
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return null;
	}
};
