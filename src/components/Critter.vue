<template>
	<li class="critter">
		<div class="critter-image-wrap">
			<div 
				:style="{ backgroundImage: `url('${image}')`, backgroundPosition }"
				class="critter-image" 
			/>
			<div 
				v-if="badge"
				class="critter-badge" 
			/>
		</div>
		<span class="critter-text">
			{{ name }}
		</span>
	</li>
</template>

<script>
export default {
	name: 'CpCritter',
	props: {
		badge: Boolean,
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

	&-badge {
		position: absolute;
		top: 0.625rem;
		right: 0.625rem;
		height: $badge-size;
		width: $badge-size;
		border-radius: 100%;
		background-color: aqua;
	}

	&-image {
		display: inline-block;
		height: 100%;
		width: 100%;
		background-size: 1000%;
		transition: $scale-transition;

		&-wrap {
			position: relative;
			z-index: 1;
			height: 6rem;
			width: 6rem;
			margin-bottom: var(--spacer-sm);

			&::before {
				content: '';
				position: absolute;
				z-index: -1;
				top: 10%;
				left: 10%;
				display: block;
				height: 80%;
				width: 80%;
				border-radius: 100%;
				background-color: var(--primary-color);
				transition: $scale-transition-lg;
			}
		}
	}

	&-text {
		font-size: 0.875rem;
	}

	&:hover {
		.critter-image {
			transform: scale(#{$scale-size});

			&-wrap::before {
				@include diagPattern;

				transform: scale(#{$scale-size-lg});
			}
		}
	}
}
</style>