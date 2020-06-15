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
			<span 
				v-if="labelTooltipText"
				class="checkbox-label-tooltip"
			>
				{{ labelTooltipText }}
			</span>
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
		checked: Boolean,
		circle: Boolean,
		id: String,
		labelTooltipText: String
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
		border: $border-width solid var(--checkbox-border-color, var(--white));
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
			transform: var(--checkbox-icon-scale, scale(0));
			transition: $scale-transition-lg;
		}

		&-tooltip {
			position: absolute;
			bottom: calc(100% + 0.5rem);
			left: 50%;
			transform: var(--checkbox-tooltip-transform, translate(-50%, 0.25rem));
			padding: 0.25rem var(--spacer-sm);
			border-radius: $border-radius;
			background-color: var(--primary-color-darkest);
			font-size: 0.75rem;
			color: var(--white);
			white-space: nowrap;
			opacity: var(--checkbox-tooltip-opacity, 0);
			transition: opacity 0.15s, transform 0.3s ease-in-out;
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
		@extend %input-hider;

		&:checked {
			+ .checkbox-label {
				--checkbox-border-color: var(--checkbox-checked-color);
				--checkbox-icon-scale: scale(1);
			}
		}
	}

	&:hover {
		--checkbox-tooltip-transform: translateX(-50%);
		--checkbox-tooltip-opacity: 1;

		z-index: 2;
		transform: scale(#{$scale-size});
	}

	&-group {
		display: inline-flex;
		
		.checkbox + .checkbox {
			margin-left: var(--spacer-sm);
		}
	}
}
</style>