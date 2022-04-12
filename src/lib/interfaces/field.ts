export type ValidationError = {
	isValid: boolean;
	errorMessage: string;
};

export enum FieldNameRegister {
	NAME = 'name',
	EMAIL = 'email',
	PASSWORD = 'password',
	PASSWORD_CONFIRMATION = 'passwordConfirmation'
}

export enum FieldNameLogin {
	EMAIL = 'email',
	PASSWORD = 'password'
}

export type RegisterUserForm = {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export type LoginUserForm = {
	email: string;
	password: string;
};
