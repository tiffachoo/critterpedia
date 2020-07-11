<template>
	<div class="selector">
		<label 
			class="selector-label"
			:for="id"
		>
			{{ label }}
		</label>
		<select 
			:id="id"
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
		id: String,
		label: String,
		options: Array,
		value: [String, Number]
	}
}
</script>

<style lang="scss">
.selector {
	--selector-color: var(--secondary-color);
	--selector-label-color: var(--secondary-color-darkest);
	
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: auto 0.4375rem auto;

	&-label {
		position: relative;
		z-index: 2;
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		justify-self: flex-start;
		padding: var(--spacer-xs) var(--spacer-sm);
		border-radius: $border-radius;
		background-color: var(--selector-label-color);
		font-size: 1rem;
		font-family: $heading-font-family;
		color: var(--white);
	}

	&-arrow,
	&-control {
		grid-row: 2 / 4;
	}

	&-arrow {
		grid-column: 2 / 3;
		align-self: stretch;
		justify-self: end;
		width: 0.875rem;
		margin: $border-width var(--spacer) $border-width 0;
		color: var(--selector-color);
		pointer-events: none;

		&-path {
			fill: currentColor;
		}
	}

	&-control {
		grid-column: 1 / 3;
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