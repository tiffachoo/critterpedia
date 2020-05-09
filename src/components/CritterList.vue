<template>
	<section class="critter-list">
		<header>
			<h2>
				{{ $route.params.type }}
			</h2>
		</header>
		<!-- filters: table / grid view, north / south, location, month, time(?) -->
		<div class="critter-list-filter">
			<selector 
				id="selectMonth"
				v-model.number="selectedMonth"
				:options="months"	
				aria-label="Select a month"
			/>
		</div>
		<ul class="critter-list-content">
			<critter
				v-for="critter in displayedCritters"
				:key="critter.id"
				:name="critter.name"
			/>
		</ul>
		<!-- <table></table> -->
	</section>
</template>

<script>
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
			critters: data,
			selectedHemis: 'south',
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
	mounted() {
		this.selectedMonth = new Date().getMonth() + 1;
	},
	methods: {
	}
}
</script>

<style lang="scss">
.critter-list {
	&-content {
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}
}
</style>