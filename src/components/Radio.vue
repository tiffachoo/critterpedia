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
		<label 
			:for="id"
			class="radio-label"
		>
			<span 
				v-if="labelTooltipText"
				class="radio-label-tooltip"
			>
				{{ labelTooltipText }}
			</span>
			<slot />
		</label>
	</div>
</template>

<script>
export default {
	name: 'CpRadio',
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

	&-label {
		display: block;
		padding: var(--spacer-sm);
		border-radius: $border-radius;
		border: $border-width solid var(--white);
		background-color: var(--radio-background-color);
		color: var(--radio-color);
		cursor: pointer;

		svg {
			display: block;
		}
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

	&-group {
		line-height: 0;
		text-align: right;

		// .radio + .radio {
		// 	margin-left: var(--spacer-sm);
		// }
	}
}
</style>