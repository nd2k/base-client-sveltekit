<script lang="ts">
	import Field from '$lib/components/field.svelte';
	import { FieldName, type ValidationError } from '$lib/interfaces/field';
	import { checkLength, comparePasswords, validateEmail } from '$lib/utils/validateField';
	import Button from '$lib/components/button.svelte';

	let registerUserForm = { name: '', email: '', password: '', confirmPassword: '' };
	let loginUserForm = { email: '', password: '' };
	let disabled: boolean = true;
	let container: HTMLElement;
	let isRegister: boolean = false;
	let nameValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};
	let loginEmailValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};
	let registerEmailValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};
	let loginPasswordValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};
	let registerPasswordValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};
	let confirmationPasswordValidationError: ValidationError = {
		isValid: null,
		errorMessage: ''
	};

	const showLogin = () => {
		isRegister = false;
	};

	const showRegister = () => {
		isRegister = true;
	};

	const submitRegisterUser = () => {
		console.log(registerUserForm);
	};

	const validateInput = (event: any): void => {
		const { value, id } = event.detail;
		if (id === FieldName.NAME) {
			nameValidationError = checkLength(value, id, 4, 6);
		}
		if (id === FieldName.LOGIN_EMAIL) {
			loginEmailValidationError = validateEmail(value);
		}
		if (id === FieldName.REGISTER_EMAIL) {
			registerEmailValidationError = validateEmail(value);
		}
		if (id === FieldName.LOGIN_PASSWORD) {
			loginPasswordValidationError = checkLength(value, id, 4, 8);
		}
		if (id === FieldName.REGISTER_PASSWORD) {
			registerPasswordValidationError = checkLength(value, id, 4, 8);
		}
		if (id === FieldName.CONFIRMATIONPASSWORD) {
			confirmationPasswordValidationError = comparePasswords(
				registerUserForm.password,
				registerUserForm.confirmPassword
			);
		}
	};
</script>

<div class="sign_page">
	<div class="container" bind:this={container} class:show_register={isRegister}>
		<div class="overlay_container">
			<div class="overlay_login">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<Button
					eventName="show_login"
					outline={true}
					rounded="15"
					width="10"
					fontSize="1.4"
					on:show_login={showLogin}>Login</Button
				>
			</div>
			<div class="overlay_register">
				<h1>Hello!</h1>
				<p>Enter your personal details and start your journey with us</p>
				<Button
					eventName="show_register"
					outline={true}
					rounded="15"
					width="10"
					fontSize="1.4"
					on:show_register={showRegister}>Register</Button
				>
			</div>
		</div>
		<div class="form_container">
			<div class="form_register">
				<form>
					<h1>Create an account</h1>
					<Field
						value={registerUserForm.name}
						id="name"
						error={nameValidationError}
						placeholder="Name..."
						on:input-validation={validateInput}
						icon="user"
					/>
					<Field
						value={registerUserForm.email}
						id="register email"
						error={registerEmailValidationError}
						placeholder="Email..."
						on:input-validation={validateInput}
						icon="email"
					/>
					<Field
						value={registerUserForm.password}
						id="register password"
						error={registerPasswordValidationError}
						type="password"
						placeholder="Password..."
						on:input-validation={validateInput}
						icon="lock"
					/>
					<Field
						value={registerUserForm.confirmPassword}
						id="confirm password"
						error={confirmationPasswordValidationError}
						type="password"
						placeholder="Confirm password..."
						on:input-validation={validateInput}
						icon="lock"
					/>
					<Button rounded="15" width="10" fontSize="1.4">Register</Button>
				</form>
			</div>
			<div class="form_login">
				<form>
					<h1>Login to your account</h1>
					<Field
						value={loginUserForm.email}
						id="login email"
						error={loginEmailValidationError}
						placeholder="Email..."
						on:input-validation={validateInput}
						icon="email"
					/>

					<Field
						value={loginUserForm.password}
						id="login password"
						error={loginPasswordValidationError}
						type="password"
						placeholder="Password..."
						on:input-validation={validateInput}
						icon="lock"
					/>
					<Button rounded="15" width="10" fontSize="1.4">Login</Button>
				</form>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.sign_page {
		font-family: $font-family;
		height: 100vh;
		width: 100vw;
		.container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: row;
			height: 100%;
			width: 100%;
			overflow: hidden;
			@media (max-width: $breack-point-sm) {
				flex-direction: column;
				height: 100%;
			}
			&::before {
				content: '';
				position: absolute;
				width: 1500px;
				height: 1500px;
				border-radius: 50%;
				background: linear-gradient(40deg, $bg-1-color, $bg-2-color);
				top: -50%;
				transform: translateX(-50%);
				transition: 1.8s ease-in-out;
				z-index: 50;
				@media (max-width: $breack-point-sm) {
					width: 1500px;
					height: 1500px;
					border-radius: 50%;
					background: linear-gradient(40deg, $bg-1-color, $bg-2-color);
					top: initial;
					right: initial;
					left: 30%;
					bottom: 60%;
					transform: translateX(-50%);
					transition: 1.8s ease-in-out;
					z-index: 50;
				}
			}
			&.show_register {
				&::before {
					transform: translate(50%);
					@media (max-width: $breack-point-sm) {
						transform: translateY(100%);
						left: -90%;
						bottom: 34%;
					}
				}
				.overlay_container {
					transition: all 1.8s ease-in-out;
					transform: translateX(100%);
					z-index: 60;
					@media (max-width: $breack-point-sm) {
						transition: all 1.8s ease-in-out;
						transform: translateY(100%);
					}
					.overlay_login {
						transition: all 1.8s ease-in-out;
						opacity: 1;
						z-index: 70;
						@media (max-width: $breack-point-sm) {
							margin-bottom: 0.8rem;
							bottom: 0;
							h1 {
								font-size: 1.5rem;
							}
							p {
								padding: 0 1rem;
							}
						}
					}
					.overlay_register {
						transition: all 1.8s ease-in-out;
						opacity: 0;
						z-index: initial;
					}
				}
				.form_container {
					transition: all 1.8s ease-in-out;
					transform: translateX(-100%);
					@media (max-width: $breack-point-sm) {
						transition: all 1.8s ease-in-out;
						transform: translateY(-100%);
					}
					.form_register {
						transition: all 1.8s ease-in-out;
						opacity: 1;
						z-index: 70;
						@media (max-width: $breack-point-sm) {
							top: 0;
							h1 {
								font-size: 1.5rem;
								margin-bottom: 0.5rem;
							}
						}
					}
					.form_login {
						transition: all 1.8s ease-in-out;
						opacity: 0;
					}
				}
			}
			.overlay_container {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;
				width: 100%;
				color: $font-white-color;
				transform: translateX(0);
				transition: all 1.8s ease-in-out;
				z-index: 60;
				.overlay_register {
					transition: all 1.2s ease-in-out;
					position: absolute;
					opacity: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					z-index: 60;
					@media (max-width: $breack-point-sm) {
						top: 0;
						h1 {
							font-size: 1.5rem;
						}
						p {
							padding: 0 1rem;
							text-align: justify;
						}
					}
				}
				.overlay_login {
					transition: all 1.2s ease-in-out;
					position: absolute;
					opacity: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					z-index: initial;
				}
			}
			.form_container {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;
				width: 100%;
				transition: all 1.8s ease-in-out;
				.form_login {
					transition: all 1.2s ease-in-out;
					position: absolute;
					opacity: 1;
					@media (max-width: $breack-point-sm) {
						bottom: 15%;
						h1 {
							font-size: 1.5rem;
							margin-bottom: 0rem;
						}
					}
					form {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
					}
				}
				.form_register {
					transition: all 1.2s ease-in-out;
					position: absolute;
					opacity: 0;
					form {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
					}
				}
			}
		}
	}
</style>
