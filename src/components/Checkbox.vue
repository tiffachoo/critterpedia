<template>
	<div class="checkbox">
		<input 
			:id="id"
			:checked="checked"
			class="checkbox-control"
			type="checkbox"
			@change="$emit('change', $event.target.checked)"
		/>
		<component 
			:is="labelTooltipText ? 'cp-tooltip' : 'label'" 
			:class="{ 'checkbox-label-circle': circle }"
			:for="id"
			:tag="labelTooltipText ? 'label' : null"
			class="checkbox-label"
		>
			<template v-slot:anchor>
				<slot />
			</template>
			{{ labelTooltipText }}
		</component>
	</div>
</template>

<script>
import CpTooltip from './Tooltip.vue';
export default {
	name: 'CpCheckbox',
	components: {
		CpTooltip
	},
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