<template>
	<div class="radio">
		<input 
			:id="id"
			:checked="isChecked"
			:name="name"
			:value="value"
			class="radio-control"
			type="radio"
			@change="$emit('change', $event.target.value)"
		/>
		<component 
			:is="labelTooltipText ? 'cp-tooltip' : 'label'" 
			:for="id"
			:tag="labelTooltipText ? 'label' : null"
			class="radio-label"
		>
			<slot />
			<template #content>
				{{ labelTooltipText }}
			</template>
		</component>
	</div>
</template>

<script>
import CpTooltip from './Tooltip.vue';
export default {
	name: 'CpRadio',
	components: {
		CpTooltip
	},
	model: {
		prop: 'valueModel',
		event: 'change'
	},
	props: {
		valueModel: String,
		value: String,
		id: String,
		labelTooltipText: String,
		name: String
	},
	computed: {
		isChecked() {
			return this.valueModel === this.value;
		}
	}
}
</script>

<style lang="scss">
.radio {
	--radio-background-color: var(--grey-tint);
	--radio-color: var(--grey);
	
	position: relative;
	display: inline-flex;

	svg {
		display: block;
		height: 2rem;
		width: 2rem;
	}

	&-path {
		fill: currentColor
	}

	&-label {
		display: block;
		padding: var(--spacer-sm);
		border-radius: $border-radius;
		border: $border-width solid var(--white);
		background-color: var(--radio-background-color);
		color: var(--radio-color);
		cursor: pointer;
	}
	
	&-control {
		@extend %input-hider;

		&:checked {
			+ .radio-label {
				--radio-color: var(--primary-color-dark);
				--radio-background-color: var(--primary-color-tint);
			}
		}
	}

	// &-group {
		// line-height: 0;

		// .radio + .radio {
		// 	margin-left: var(--spacer-sm);
		// }
	// }
}
</style>