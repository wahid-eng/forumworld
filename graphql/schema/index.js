import { mergeSchemas } from '@graphql-tools/schema';
import userSchema from './user.schema.js';

export const schema = mergeSchemas({
	schemas: [userSchema],
});
