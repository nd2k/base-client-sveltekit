<script lang="ts">
	import type { ValidationError } from '$lib/interfaces/field';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { User, Unlock, CheckCircle, Mail, X } from 'lucide-svelte';

	export let value: string;
	export let id: string;
	export let placeholder: string = 'Default';
	export let icon: string = 'user';
	export let validation: boolean = true;
	export let error: ValidationError = {
		isValid: false,
		errorMessage: ''
	};
	export let bgColor: string = 'bg-1-color';
	export let color: string = 'font-white-color';
	export let fontSize: string = 'font-size-3';
	export let width: string = 'auto';
	export let rounded: string = 'rounded-1';
	export let type: string = 'text';
	export let margin: string = 'margin-3';

	let computedStyle: string = `
    width:${width}%;`;

	const computedClass = (): string => {
		if (validation && icon !== null) {
			return `field ${bgColor} ${color} ${fontSize} ${rounded} ${margin} hasValidation hasIcon`;
		}
		if (validation) {
			return `field ${bgColor} ${color} ${fontSize} ${rounded} ${margin} hasValidation`;
		}
		if (icon !== null) {
			return `field ${bgColor} ${color} ${fontSize} ${rounded} ${margin} hasIcon`;
		} else {
			return `field ${bgColor} ${color} ${fontSize} ${rounded} ${margin}`;
		}
	};

	const dispatch = createEventDispatcher();

	const typeAction = (node: HTMLInputElement): void => {
		node.type = type;
	};
</script>

<div class="field_form">
	<div class={computedClass()} style={computedStyle}>
		{#if icon === 'user'}
			<div class="icon"><User /></div>
		{/if}
		{#if icon === 'email'}
			<div class="icon"><Mail /></div>
		{/if}
		{#if icon === 'lock'}
			<div class="icon"><Unlock /></div>
		{/if}
		<input
			use:typeAction
			bind:value
			{id}
			{placeholder}
			autocomplete=""
			on:input={() => dispatch('input-validation', { value, id })}
		/>
		{#if validation}
			{#if error.isValid}
				<div class="validation_icon success"><CheckCircle /></div>
			{:else if error.errorMessage}
				<div class="validation_icon error"><X /></div>
			{:else}
				<div class="validation_icon" />
			{/if}
		{/if}
	</div>
	{#if error.isValid === false}
		<div class="validation_error" transition:fade>{error.errorMessage}</div>
	{/if}
</div>

<style lang="scss">
	.field_form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.field {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			@each $class, $bg-color in $bg-colors {
				&.#{$class} {
					background-color: $bg-color;
					.icon {
						background-color: $bg-color;
					}
					input {
						background-color: $bg-color;
					}
					.validation_icon {
						background-color: $bg-color;
					}
				}
			}
			@each $class, $font-color in $font-colors {
				&.#{$class} {
					.icon {
						color: $font-color;
					}
					input {
						color: $font-color;
						&::placeholder {
							color: rgba($font-color, 60%);
						}
					}
				}
			}
			@for $i from 1 through 5 {
				&.margin-#{$i} {
					margin: $i * 0.3rem;
				}
				&.rounded-#{$i} {
					border-radius: $i * 15px;
					.icon {
						border-top-left-radius: $i * 15px;
						border-bottom-left-radius: $i * 15px;
					}
					.validation_icon {
						border-top-right-radius: $i * 15px;
						border-bottom-right-radius: $i * 15px;
					}
				}
				&.rounded-#{$i}.hasIcon {
					input {
						border-top-right-radius: $i * 15px;
						border-bottom-right-radius: $i * 15px;
					}
				}
				&.rounded-#{$i}.hasValidation {
					input {
						border-top-left-radius: $i * 15px;
						border-bottom-left-radius: $i * 15px;
					}
				}
				&.rounded-#{$i}.hasValidation.hasIcon {
					input {
						border-radius: 0;
					}
				}
				&.font-size-#{$i} {
					.icon {
						padding: $i * 0.2rem;
						height: $i * 0.5rem;
						width: $i * 0.5rem;
						border-bottom: $i * 0.7px solid $bg-black-color;
						border-top: $i * 0.7px solid $bg-black-color;
						border-left: $i * 0.7px solid $bg-black-color;
					}
					input {
						padding: $i * 0.2rem;
						font-size: $i * 0.4rem;
						height: $i * 0.5rem;
						border: $i * 0.7px solid $bg-black-color;
					}
					.validation_icon {
						padding: $i * 0.2rem;
						height: $i * 0.5rem;
						width: $i * 1rem;
						border-bottom: $i * 0.7px solid $bg-black-color;
						border-top: $i * 0.7px solid $bg-black-color;
						border-right: $i * 0.7px solid $bg-black-color;
					}
				}
			}
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			input {
				outline: none;
				width: 100%;
				padding-left: 0.5rem;
			}
			.validation_icon {
				display: flex;
				align-items: center;
				justify-content: center;
				&.success {
					color: $font-success-color;
				}
				&.error {
					color: $font-danger-color;
				}
			}
			&.hasIcon {
				input {
					border-left: none;
				}
			}
			&.hasValidation {
				input {
					border-right: none;
				}
			}
		}
		.validation_error {
			max-width: 100%;
			font-size: 0.7rem;
			color: $font-danger-color;
			text-align: left;
			margin-left: 2rem;
			margin-top: -0.5rem;
			align-self: flex-start;
		}
	}
</style>
