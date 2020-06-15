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
</style>