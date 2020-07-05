<template>
	<div class="selector">
		<select 
			v-bind="$attrs"
			class="selector-control"
			:value="value"
			@input="$emit('input', $event.target.value)"
		>
			<option 
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>
		<svg 
			class="selector-arrow"
			viewBox="0 0 45.41 34.92"
		>
			<path 
				class="selector-arrow-path"
				d="M25.19,33.61l19.7-28.92C46.24,2.7,44.82,0,42.41,0H3.01C0.6,0-0.83,2.7,0.53,4.69l19.7,28.92 C21.42,35.36,23.99,35.36,25.19,33.61z"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'CpSelector',
	inheritAttrs: false,
	props: {
		options: Array,
		value: [String, Number]
	}
}
</script>

<style lang="scss">
.selector {
	--selector-color: var(--secondary-color);
	
	display: grid;
	grid-template-columns: 3fr 1fr;

	&-arrow {
		grid-column: 2 / 3;
		grid-row: 1;
		align-self: stretch;
		justify-self: end;
		width: 0.875rem;
		margin: $border-width var(--spacer) $border-width 0;
		color: var(--selector-color);
		transition: 0.3s ease-in-out;
		pointer-events: none;

		&-path {
			fill: currentColor;
		}
	}

	&-control {
		grid-column: 1 / 3;
		grid-row: 1;
		width: 100%;
		padding: var(--spacer-sm) var(--spacer);
		border-radius: $border-radius;
		border: $border-width solid var(--selector-color);
		background-color: var(--white);
		font-family: $primary-font-family;
		font-size: 1.125rem;
		color: var(--black);
		-webkit-appearance: none;
		-moz-appearance: none;
		cursor: pointer;

		// &:focus {
		// 	+ .selector-arrow {
		// 		transform: scale(1.2);
		// 	}
		// }

		&:hover {
			+ .selector-arrow {
				transform-origin: bottom center;
				animation: boingy 1s ease-in-out infinite;
			}
		}
	}
}

@keyframes boingy {
	0%, 100% { transform: translateY(0) }
	25%, 75% { transform: translateY(0.09375rem) }
	50% { transform: translateY(0.1875rem) scaleY(0.8) }
}
</style>