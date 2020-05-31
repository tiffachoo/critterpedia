<template>
	<component 
		:is="$attrs.href ? 'a' : $attrs.to ? 'router-link' : 'button'"
		v-bind="$attrs"
		:class="{ 'button-circle': circle }"
		class="button"
	>
		<svg class="button-sparks button-sparks-left">
			<line class="button-sparks-line button-sparks-line-top" x1="5" y1="1.5" x2="15" y2="1.5" />
			<line class="button-sparks-line button-sparks-line-middle" x1="5" y1="50%" x2="15" y2="50%" />
			<line class="button-sparks-line button-sparks-line-bottom" x1="5" y1="100%" x2="15" y2="100%" />
		</svg>
		<svg class="button-sparks button-sparks-right">
			<line class="button-sparks-line button-sparks-line-top" x1="5" y1="1.5" x2="15" y2="1.5" />
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
	--button-sparks-line-offset: 5px;

	position: relative;
	display: inline-block;
	min-height: 2.5rem;
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
	transition: $scale-transition;
	cursor: pointer;

	&-sparks {
		position: absolute;
		top: -$border-width;
		height: calc(100% + (2 * #{$border-width}));
		width: 30px;
		pointer-events: none;

		&-line {
			fill: none;
			stroke: var(--button-border-color);
			stroke-width: 7.5%;
			stroke-linecap: round;
			stroke-miterlimit: 10;
			stroke-dasharray: 6 24;
			stroke-dashoffset: 15;

			&-top {
				transform: translate(var(--button-sparks-line-offset), 0) rotate(45deg);
				transform-origin: 0 1.5px;
			}

			&-bottom {
				transform: translate(var(--button-sparks-line-offset), -1.5px) rotate(-45deg);
				transform-origin: 0 100%;
			}
		}

		&-left {
			left: -1rem;
		}

		&-right {
			right: -1rem;
			transform: scaleX(-1);
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
		transform: scale(0.95);

		.button-sparks-line {
			animation: plink 0.6s cubic-bezier(0.8, 0, 0.2, 0.9) forwards;
		}
	}

	&:focus {
		// --button-border-color: var(--primary-color-darkest);

		outline: none;
	}

	&.active {
		--button-background-color: var(--primary-color-darkest);

		z-index: 5;
		cursor: default;
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