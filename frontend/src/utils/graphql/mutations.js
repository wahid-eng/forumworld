import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
	mutation Register($payload: RegisterPayload!) {
		register(payload: $payload) {
			token
		}
	}
`;

export const LOGIN_MUTATION = gql`
	mutation Login($payload: LoginPayload!) {
		login(payload: $payload) {
			token
		}
	}
`;
