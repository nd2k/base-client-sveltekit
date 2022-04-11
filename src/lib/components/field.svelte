<script lang="ts">
	import type { ValidationError } from '$lib/interfaces/field';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { User, Unlock, CheckCircle, Mail, X } from 'lucide-svelte';

	export let value: string;
	export let id: string;
	export let placeholder: string = 'default';
	export let type: string = 'text';
	export let error: ValidationError;
	export let width: string = '100%';
	export let icon: string = 'none';
	export let bgColor: string = 'bg-1-color';
	export let color: string = 'font-white-color';

	let computedClass: string = 'form_field' + ' ' + bgColor + ' ' + color;

	const dispatch = createEventDispatcher();

	const typeAction = (node: HTMLInputElement): void => {
		node.type = type;
	};
</script>

<div class={computedClass} style:width>
	<div class="field">
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
	</div>
	{#if error.isValid === false}
		<div class="validation_error" transition:fade>{error.errorMessage}</div>
	{/if}
</div>

<style lang="scss">
	.form_field {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		margin: 1rem;
		@each $class, $bg-color in $bg-colors {
			&.#{$class} {
				.icon {
					background-color: $bg-color;
				}
				input {
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
		.field {
			display: flex;
			align-items: center;
			.icon {
				border-top-left-radius: 15px;
				border-bottom-left-radius: 15px;
				padding: 0.8rem;
			}
			input {
				border: none;
				padding: 1rem 0.5rem;
				width: 100%;
				border-top-right-radius: 15px;
				border-bottom-right-radius: 15px;
				outline: none;
				font-size: 1.2rem;
			}
		}

		.validation_error {
			max-width: 100%;
			font-size: 0.7rem;
			color: $font-danger-color;
			text-align: left;
			margin-left: 1rem;
		}
	}
</style>
