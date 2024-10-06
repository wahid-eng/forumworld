import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server-express';
import { schema } from './graphql/schema/index.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

// GraphQL
const server = new ApolloServer({ schema });
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
