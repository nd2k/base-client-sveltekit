export type ValidationError = {
	isValid: boolean;
	errorMessage: string;
};

export enum FieldName {
	NAME = 'name',
	LOGIN_EMAIL = 'login email',
	LOGIN_PASSWORD = 'login password',
	REGISTER_EMAIL = 'register email',
	REGISTER_PASSWORD = 'register password',
	CONFIRMATIONPASSWORD = 'confirmationPassword'
}
