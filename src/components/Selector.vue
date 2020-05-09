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
	</div>
</template>

<script>
export default {
	name: 'Selector',
	inheritAttrs: false,
	props: {
		options: Array,
		value: [String, Number]
	}
}
</script>

<style lang="scss">
.selector {
	&-control {
		width: 100%;
	}
}
</style>