import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
	mutation Register($payload: RegisterPayload!) {
		register(payload: $payload) {
			user {
				id
				name
				email
			}
			token
		}
	}
`;
