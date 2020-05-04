<template>
	<li class="critter">
		<img 
			:alt="`Thumbnail of ${name}`"
			class="critter-image"
			src="" 
		>
		<span class="critter-text">
			{{ name }}
		</span>
	</li>
</template>

<script>
export default {
	name: 'Critter',
	props: {
		name: String
	}
}
</script>

<style lang="scss">
.critter {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: var(--spacer);
	background-color: var(--primary-color);
	text-align: center;

	&-image {
		display: inline-block;
		width: 100%;
		max-width: 6rem;
		margin-bottom: var(--spacer-sm);
		border-radius: 100%;
		background-color: var(--primary-color-tint);
	}

	&-text {
		font-size: 0.875rem;
	}
}
</style>