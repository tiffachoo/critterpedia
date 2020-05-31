<template>
	<component 
		:is="$attrs.href ? 'a' : $attrs.to ? 'router-link' : 'button'"
		v-bind="$attrs"
		:class="{ 'button-circle': circle }"
		class="button"
	>
		<svg class="button-sparks button-sparks-left">
			<line class="button-sparks-line button-sparks-line-top" x1="5" y1="2.5" x2="15" y2="2.5" />
			<line class="button-sparks-line button-sparks-line-middle" x1="5" y1="50%" x2="15" y2="50%" />
			<line class="button-sparks-line button-sparks-line-bottom" x1="5" y1="100%" x2="15" y2="100%" />
		</svg>

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

	&-sparks {
		position: absolute;
		top: 0;
		height: 100%;
		width: 30px;

		&-line {
			fill: none;
			stroke: var(--button-border-color);
			stroke-width: 5;
			stroke-linecap: round;
			stroke-miterlimit: 10;
			stroke-dasharray: 8 22;
			stroke-dashoffset: 15;

			&-top {
				transform: translate(10px, 0) rotate(45deg);
				transform-origin: 0 2.5px;
			}

			&-bottom {
				transform: translate(10px, -2.5px) rotate(-45deg);
				transform-origin: 0 100%;
			}
		}

		&-left {
			left: -1.25rem;
		}
	}

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

	&:active {
		.button-sparks-line {
			animation: plink 0.6s cubic-bezier(0.8, 0, 0.2, 0.9) forwards;
		}
	}

	&.active {
		--button-background-color: var(--primary-color-darkest);

		z-index: 5;
	}
}

@keyframes plink {
	0% { stroke-dashoffset: -15; }
	50%{ stroke-dashoffset: 0; }
	70% { opacity: 1; }
	100% { 
		stroke-dashoffset: 15; 
		opacity: 0; 
	}
}
</style>