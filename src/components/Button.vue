<template>
	<component 
		:is="$attrs.href ? 'a' : $attrs.to ? 'router-link' : 'button'"
		v-bind="$attrs"
		:class="{ 'button-circle': circle }"
		class="button"
	>
		<slot />
	</component>
</template>

<script>
export default {
	name: 'CpButton',
	props: {
		circle: Boolean
	}
}
</script>

<style lang="scss">
.button {
	--button-border-color: var(--primary-color);
	--button-background-color: var(--primary-color);
	--button-color: var(--white);
	// --diag-color-1: var(--primary-color);
	// --diag-color-2: var(--primary-color-dark);

	position: relative;
	display: inline-block;
	padding: var(--spacer-sm) var(--spacer);
	border-radius: $border-radius;
	border: $border-width solid var(--button-border-color);
	background-color: var(--button-background-color);
	background-repeat: repeat;
	font-family: $primary-font-family;
	font-size: 1.125rem;
	line-height: 1;
	color: var(--button-color);
	text-decoration: none;

	&-circle {
		display: inline-grid;
		place-items: center;
		padding: 0;
		border-radius: 100%;
	}

	&:hover {
		&:not(.active) {
			@include diagPattern;
		}
	}

	&.active {
		--button-background-color: var(--primary-color-darkest);

		z-index: 5;
	}
}

</style>