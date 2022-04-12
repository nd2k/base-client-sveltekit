<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let bgColor: string = 'bg-1-color';
	export let color: string = 'font-white-color';
	export let width: string = 'auto';
	export let height: string = 'auto';
	export let rounded: string = '0';
	export let fontSize: string = '1';
	export let eventName: string = 'default-event';
	export let outline: boolean = false;
	export let disabled: boolean = false;
	export let type: string = 'button';

	const computedClass = (): string => {
		if (outline) {
			return `outline-${bgColor} + ' ' + outline-${color}`;
		}
		return bgColor + ' ' + color;
	};

	let computedStyle: string = `
    width:${width}rem; 
    height:${height}rem; 
    border-radius:${rounded}px; 
    font-size:${fontSize}rem;`;

	const dispatch = createEventDispatcher();
	const btnClick = () => {
		dispatch(eventName);
	};
</script>

<button {type} {disabled} class={computedClass()} style={computedStyle} on:click={btnClick}>
	<slot />
</button>

<style lang="scss">
	button {
		cursor: pointer;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5), 5px 5px 5px rgba(0, 0, 0, 0.2);
		border: none;
		outline: none;
		padding: 1rem;
		letter-spacing: 2px;
		background-color: $bg-white-color;
		&:hover {
			transform: scale(95%);
			@each $class, $bg-color in $bg-colors {
				&.#{$class} {
					background-color: darken($bg-color, 30%);
				}
			}
			@each $class, $font-color in $font-colors {
				&.#{$class} {
					color: lighten($font-color, 10%);
				}
			}
			@each $class, $bg-color in $bg-colors {
				&.outline-#{$class} {
					color: darken($bg-color, 30%);
				}
			}
			@each $class, $font-color in $font-colors {
				&.outline-#{$class} {
					background-color: darken($font-color, 5%);
				}
			}
		}
		&:active {
			box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset 1px 1px 2px rgba(0, 0, 0, 0.2);
		}
		@each $class, $bg-color in $bg-colors {
			&.#{$class} {
				background-color: $bg-color;
			}
			&.outline-#{$class} {
				color: $bg-color;
			}
		}
		@each $class, $font-color in $font-colors {
			&.#{$class} {
				color: $font-color;
			}
			&.outline-#{$class} {
				background-color: $font-color;
			}
		}
		&:disabled {
			cursor: not-allowed;
			pointer-events: none;
			color: $bg-6-color;
			background-color: lighten($bg-1-color, 15%);
		}
	}
</style>
