<template>
	<li class="critter">
		<div 
			class="critter-image"
			:style="{ backgroundImage: `url('${image}')`, backgroundPosition }"
		/>
		<span class="critter-text">
			{{ name }}
		</span>
	</li>
</template>

<script>
export default {
	name: 'Critter',
	props: {
		id: Number,
		image: String,
		name: String
	},
	computed: {
		backgroundPosition() {
			const x = ((this.id - 1) % 10) / 9 * 100;
			const y = parseInt(this.id / 10 - 0.1) / 7 * 100;
			return `${x}% ${y}%`
		}
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
	background-color: var(--primary-color-tint);
	text-align: center;

	&-image {
		display: inline-block;
		height: 6rem;
		width: 6rem;
		margin-bottom: var(--spacer-sm);
		border-radius: 100%;
		background-color: var(--primary-color);
		background-size: 1000%;
	}

	&-text {
		font-size: 0.875rem;
	}
}
</style>