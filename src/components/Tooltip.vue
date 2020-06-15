<template>
	<component 
		:is="tag"
		class="tooltip"
	>
		<slot name="anchor" />
		<div class="tooltip-content">
			<slot />
		</div>
	</component>
</template>

<script>
	export default {
		name: 'CpTooltip',
		props: {
			size: String,
			tag: {
				type: String,
				default: 'div'
			}
		}
	}
</script>

<style lang="scss">
.tooltip {
	position: relative;

	&-content {
		position: absolute;
		bottom: calc(100% + 0.125rem);
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

	&:hover {
		--checkbox-tooltip-transform: translateX(-50%);
		--checkbox-tooltip-opacity: 1;
	}
}
</style>