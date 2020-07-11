<template>
	<component 
		:is="tag"
		class="tooltip"
	>
		<slot />
		<div class="tooltip-content">
			<slot name="content"  />
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
	--tooltip-background-color: var(--primary-color-darkest);

	position: relative;

	&-content {
		position: absolute;
		bottom: calc(100% + 0.125rem);
		left: 50%;
		transform: var(--tooltip-transform, translate(-50%, var(--spacer-xs)));
		padding: var(--spacer-xs) var(--spacer-sm);
		border-radius: $border-radius;
		background-color: var(--tooltip-background-color);
		font-size: 0.75rem;
		color: var(--white);
		white-space: nowrap;
		opacity: var(--tooltip-opacity, 0);
		transition: opacity 0.15s, transform 0.3s ease-in-out;
	}

	&:hover {
		--tooltip-transform: translateX(-50%);
		--tooltip-opacity: 1;
	}
}
</style>