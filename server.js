import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import winston from 'winston';
import { ApolloServer, gql } from 'apollo-server-express';
import { schema } from './graphql/schema/index.js';
import depthLimit from 'graphql-depth-limit';
import { getUserFromToken } from './graphql/auth.js';

const app = express();
const port = process.env.PORT || 8000;

// logger
const logger = winston.createLogger({
	level: 'error',
	format: winston.format.combine(
		winston.format.timestamp(), // Add timestamp
		winston.format.json() // Log in JSON format
	),
	transports: [new winston.transports.File({ filename: 'error.log' })],
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

// GraphQL
const server = new ApolloServer({
	schema,
	validationRules: [depthLimit(5)],
	context: ({ req }) => {
		const token = req.headers.authorization || '';
		const user = getUserFromToken(token.replace('Bearer ', ''));
		return { user };
	},
	formatError: (error) => {
		logger.error(error.message, { stack: error.stack });
		return {
			message: error.message,
			code: error.extensions.code || 'INTERNAL_SERVER_ERROR',
		};
	},
});
await server.start();
server.applyMiddleware({ app });

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
			console.log(
				`🚀 GraphQL ready at http://localhost:${port}${server.graphqlPath}`
			);
		});
	})
	.catch((err) => console.error('MongoDB connection error:', err));
