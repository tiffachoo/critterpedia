<template>
	<nav class="nav">
		<cp-button
			circle
			class="nav-link"
			color="white"
			to="/bugs"
			tooltip-text="Bugs"
		>
			<svg 
				id="butterfly"
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 100 100" 
				class="nav-link-icon butter-icon"
			>
				<path class="butter-antenna-stroke" d="M49.5 44S46.8 16 33 16c-2.8 0-3.3 2.3-3.3 2.3"/>
				<path class="butter-antenna-stroke" d="M50.5 44S53.2 16 67 16c2.8 0 3.3 2.3 3.3 2.3"/>
				<g>
					<path class="butter-wing-fill" d="M50 44.6c-.6-3.1-1.8-6.3-3.7-9.4-7-11-19.9-15.5-29-9.8S6.5 44.7 13.4 55.8c3.4 5.4 8.2 9.2 13.3 11-1.9 6.5.7 13.3 6.4 16 5.9 2.9 13.1.4 17-5.6V44.6z"/>
					<path class="butter-deets-fill" d="M17.3 25.4c-7.7 4.8-10 15.3-6.4 25.1A30.3 30.3 0 0124 30.3c4-2.5 8.4-4 13-4.2-6.4-3.8-13.9-4.3-19.7-.7z"/>
					<circle class="butter-deets-fill" cx="28.6" cy="43.5" r="5.5"/>
					<circle class="butter-deets-fill" cx="33" cy="56.7" r="3.3"/>
				</g>
				<g>
					<path class="butter-wing-fill" d="M50 44.6c.6-3.1 1.8-6.3 3.7-9.4 7-11 19.9-15.5 29-9.8s10.8 19.3 3.8 30.4a26.5 26.5 0 01-13.2 11c1.9 6.4-.7 13.3-6.4 16-6 2.9-13.2.4-17-5.6V44.6z"/>
					<path class="butter-deets-fill" d="M82.7 25.4c7.6 4.8 10 15.3 6.4 25.1A30.3 30.3 0 0076 30.3c-4-2.5-8.4-4-13-4.2 6.4-3.8 13.8-4.3 19.7-.7z"/>
					<circle class="butter-deets-fill" cx="71.4" cy="43.5" r="5.5"/>
					<circle class="butter-deets-fill" cx="67" cy="56.7" r="3.3"/>
				</g>
			</svg>
		</cp-button>
		<cp-button
			circle
			class="nav-link"
			color="white"
			to="/fish"
			tooltip-text="Fish"
		>
			<svg 
				id="fishy" 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 100 100"
				class="nav-link-icon fish-icon"
			>
				<ellipse class="fish-fin-fill" cx="57.1" cy="32.5" rx="19" ry="13.5"/>
				<ellipse class="fish-fin-fill" cx="57.1" cy="67.5" rx="19" ry="13.5"/>
				<path id="fishFinBack" class="fish-scales-fill" d="M96.6 43c0-4-3.8-6.5-8.1-6.5-6.4 0-10.2 5.5-13.4 7.5s-7.6 1-7.6 1v14s4.3-1 7.6 1 7 7.5 13.4 7.5c4.3 0 8-2.5 8-6.5s-3.2-6-3.2-9 3.3-5 3.3-9z"/>
				<path class="fish-scales-fill" d="M40.5 24C20.7 23.6 4.3 35.6 4 50.8 3.7 66 19.6 78.6 39.5 79S75.7 67.4 76 52.2 60.4 24.4 40.5 24zM22.1 56a6 6 0 110-12 6 6 0 010 12z"/>
				<path id="fishFinFront" class="fish-fin-fill" d="M31.3 57.5s5.4-4 11.7-4c8.5 0 4.5 16-6.3 16-6.8 0-8.1-2-8.1-2s2.7-1 2.7-4v-6z"/>
			</svg>
		</cp-button>
	</nav>
</template>

<script>
import CpButton from './Button.vue'
export default {
	name: 'CpNav',
	components: {
		CpButton
	}
}
</script>

<style lang="scss">
.nav {
	--button-size: 4.5rem;

	position: fixed;
	z-index: 99;
	top: calc(var(--spacer) + 0.5rem);
	left: var(--spacer);
	display: flex;
	align-self: center;
	justify-self: start;


	@media (max-width: $sm - 1) {
		--button-size: 3.5rem;
	}

	.button {
		--button-active-background-color: var(--secondary-color);
		--button-sparks-line-offset: 10px;
	}

	&-link {
		height: var(--button-size);
		width: var(--button-size);

		+ .nav-link {
			margin-left: -0.75rem;
		}

		&-icon {
			width: 80%;	
		}
	}
}

.butter-deets-fill,
.fish-scales-fill {
	fill: var(--secondary-color-darkest);
}

.butter-wing-fill,
.fish-fin-fill {
	fill: var(--secondary-color-tint);
}

.butter-antenna-stroke {
	fill: none;
	stroke: var(--secondary-color-darkest);
	stroke-width: 3;
	stroke-linecap: round;
	stroke-miterlimit: 10;
}
</style>