<template>
	<div class="checkbox">
		<input 
			:id="id"
			:checked="checked"
			class="checkbox-control"
			type="checkbox"
			@change="$emit('change', $event.target.checked)"
		/>
		<label 
			:class="{ 'checkbox-label-circle': circle }"
			:for="id"
			class="checkbox-label"
		>
			<slot />
		</label>
	</div>
</template>

<script>
export default {
	name: 'CpCheckbox',
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		circle: Boolean,
		id: String,
		checked: Boolean
	}
}
</script>

<style lang="scss">
.checkbox {
	--checkbox-color: var(--primary-color);
	--checkbox-checked-color: var(--primary-color);

	position: relative;
	display: inline-block;
	transition: $scale-transition;

	&-label {
		position: relative;
		display: block;
		border-radius: $border-radius;
		border: $border-width solid var(--white);
		background-color: var(--white);
		color: var(--checkbox-color);
		cursor: pointer;
		transition: border 0.2s ease-in-out;

		&::after {
			content: '\002714';
			position: absolute;
			right: -0.1875rem;
			top: -0.1875rem;
			display: grid;
			place-items: center;
			height: $badge-size;
			width: $badge-size;
			border-radius: 100%;
			background-color: var(--checkbox-checked-color);
			font-size: 0.5em;
			line-height: 1;
			color: var(--white);
			transform: scale(0);
			transition: $scale-transition-lg;
		}
		
		&-circle {
			display: grid;
			place-items: center;
			height: 2.5rem;
			width: 2.5rem;
			padding: 0;
			border-radius: 100%;
			line-height: 1;
		}
	}

	&-control {
		position: absolute;
		opacity: 0;

		&:checked {
			+ .checkbox-label {
				border-color: var(--checkbox-checked-color);

				&::after {
					transform: scale(1);
				}
			}
		}
	}

	&:hover {
		z-index: 2;
		transform: scale(#{$scale-size});
	}

	&-group {
		display: flex;
	}
}
</style>