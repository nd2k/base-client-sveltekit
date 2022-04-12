import type { LoginUserForm, RegisterUserForm } from '$lib/interfaces/field';
import axios from 'axios';

const baseURL = 'https://user-management-2022.herokuapp.com/api/user-management/v1/';

const instance = axios.create({
	baseURL,
	timeout: 3000,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
	}
});

export const registerUser = async (registerUserForm: RegisterUserForm) => {
	instance
		.post('/users', registerUserForm)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};

export const loginUser = async (loginUserForm: LoginUserForm) => {
	instance
		.post('/sessions', loginUserForm)
		.then((data) => {
			console.log(data);

			return data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};
