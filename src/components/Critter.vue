<template>
	<component 
		:is="tag"
		class="critter"
	>
		<div 
			:class="{ 'critter-image-hover': hoverPattern }"
			class="critter-image-wrap"
		>
			<div 
				:style="{ backgroundImage: `url('${image}')`, backgroundPosition }"
				class="critter-image" 
			/>
			<div 
				v-if="badge"
				class="critter-badge" 
			/>
		</div>
		<span 
			v-if="name"
			class="critter-text"
		>
			{{ name }}
		</span>
	</component>
</template>

<script>
export default {
	name: 'CpCritter',
	props: {
		badge: Boolean,
		hoverPattern: {
			type: Boolean,
			default: true
		},
		id: Number,
		image: String,
		name: String,
		tag: {
			type: String,
			default: 'li'
		}
	},
	computed: {
		backgroundPosition() {
			const x = (((this.id - 1) % 10) / 9 * 100).toFixed(2);
			const y = (parseInt((this.id / 10 - 0.1).toFixed(2)) / 7 * 100).toFixed(2);
			return `${x}% ${y}%`
		}
	}
}
</script>

<style lang="scss">
.critter {
	--critter-size: 6rem;
	--critter-background-color: var(--primary-color-tint);
	--critter-circle-background-color: var(--primary-color);
	--critter-font-size: 0.875rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: var(--spacer);
	background-color: var(--critter-background-color);
	text-align: center;

	@media (max-width: $sm - 1) {
		--critter-size: 4rem;
	}

	&-badge {
		position: absolute;
		top: 0.625rem;
		right: 0.625rem;
		height: $badge-size;
		width: $badge-size;
		border-radius: 100%;
		border: $border-width solid var(--white);
		background-color: var(--secondary-color);
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
			height: var(--critter-size);
			width: var(--critter-size);
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
				background-color: var(--critter-circle-background-color);
				transition: $scale-transition-lg;
			}
		}
	}

	&-text {
		font-size: var(--critter-font-size);
	}

	&:hover {
		.critter-image {
			transform: scale(#{$scale-size});

			&-wrap::before {
				transform: scale(#{$scale-size-lg});
			}

			&-hover::before {
				@include diagPattern;
			}
		}
	}
}
</style>