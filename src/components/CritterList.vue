<template>
	<section class="critter-list">
		<header>
			<h2 class="heading-boxed">
				{{ $route.params.type }}
			</h2>
			<!-- filters: table / grid view, north / south, location, month, time(?) -->
			<div class="critter-list-filter">
				<selector 
					id="selectMonth"
					v-model.number="selectedMonth"
					:options="months"	
					aria-label="Select a month"
				/>
			</div>
		</header>
		<transition-group
			class="critter-list-content"
			name="critter-transition"
			tag="ul"
		>
			<critter
				v-for="critter in displayedCritters"
				:id="critter.id"
				:key="critter.id"
				:image="critterImage"
				:name="critter.name"
			/>
		</transition-group>
		<!-- <table></table> -->
	</section>
</template>

<script>
import critterImage from '../assets/acnh-fish-sprites.png';
import Critter from './Critter.vue';
import Selector from './Selector.vue';
import { data } from '../data/fish.json';

export default {
	name: 'CritterList',
	components: {
		Critter,
		Selector
	},
	data() {
		return {
			critterImage,
			critters: data,
			selectedHemis: 'north',
			selectedLocation: '',
			selectedLayout: 'grid',
			selectedMonth: 1,
			months: [
				{
					value: 1,
					text: 'January'
				},
				{
					value: 2,
					text: 'February'
				},
				{
					value: 3,
					text: 'March'
				},
				{
					value: 4,
					text: 'April'
				},
				{
					value: 5,
					text: 'May'
				},
				{
					value: 6,
					text: 'June'
				},
				{
					value: 7,
					text: 'July'
				},
				{
					value: 8,
					text: 'August'
				},
				{
					value: 9,
					text: 'September'
				},
				{
					value: 10,
					text: 'October'
				},
				{
					value: 11,
					text: 'November'
				},
				{
					value: 12,
					text: 'December'
				}
			]	
		}
	},
	computed: {
		displayedCritters() {
			return this.critters.filter(critter => {
				return critter['months'][this.selectedHemis].includes(this.selectedMonth);
			});
		}
	},
	beforeMount() {
		this.selectedMonth = new Date().getMonth() + 1;
	},
	methods: {
	}
}
</script>

<style lang="scss">
.critter-list {
	&-content {
		position: relative;
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}

	&-filter {
		padding: var(--spacer-lg) var(--spacer);
		margin-bottom: var(--spacer);
		border-radius: $border-radius;
		background-color: var(--grey-tint);
	}
}

.critter-transition {
	&-move,
	&-enter-active {
		transition: 0.5s ease-in-out;
	}

	&-leave-active {
		position: absolute;
		opacity: 0;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}
</style>