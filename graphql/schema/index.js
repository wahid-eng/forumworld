import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers, userTypeDefs } from './user.schema.js';
import { postResolvers, postTypeDefs } from './post.schema.js';

const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs]);
const resolvers = mergeResolvers([userResolvers, postResolvers]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
