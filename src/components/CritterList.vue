<template>
	<section class="critter-list">
		<header>
			<h2 class="heading-boxed">
				{{ $route.params.type }}
			</h2>
			<!-- filters: table / grid view, north / south, location, month, time(?) -->
			<div class="critter-list-filter">
				<cp-selector 
					id="selectMonth"
					v-model.number="selectedMonth"
					:options="months"	
					aria-label="Select a month"
				/>
				<cp-selector 
					id="selectLocation"
					v-model="selectedLocation"
					:options="locationList"	
					aria-label="Select a location"
				/>
				<input 
					v-model="isNow"
					type="checkbox" 
				/>
			</div>
		</header>
		<transition-group
			class="critter-list-content"
			name="critter-transition"
			tag="ul"
		>
			<cp-critter
				v-for="critter in displayedCritters"
				:id="critter.id"
				:key="critter.id"
				:badge="checkCritterIsNew(critter['months'][selectedHemis])"
				:image="critterImage"
				:name="critter.name"
			/>
		</transition-group>
		<!-- <table></table> -->
	</section>
</template>

<script>
import critterImage from '../assets/acnh-fish-sprites.png';
import CpCritter from './Critter.vue';
import CpSelector from './Selector.vue';
import { data } from '../data/fish.json';

export default {
	name: 'CpCritterList',
	components: {
		CpCritter,
		CpSelector
	},
	data() {
		return {
			critterImage,
			critters: data,
			isNow: false,
			selectedHemis: 'north',
			selectedLayout: 'grid',
			selectedLocation: '',
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
			const currentTime = new Date().getHours();
			
			return this.critters.filter(critter => {
				let isAvailNow = false;
				if (this.isNow) {
					const startTime = critter['time']['start'];
					const endTime = critter['time']['end'];
					isAvailNow = this.isNow &&
						((startTime < endTime && startTime <= currentTime && endTime >= currentTime) ||
						(startTime > endTime && (startTime <= currentTime || endTime >= currentTime)));
				}
				
				return critter['months'][this.selectedHemis].includes(this.selectedMonth) &&
					(!this.selectedLocation || critter['location'].toLowerCase() === this.selectedLocation) &&
					(!this.isNow || isAvailNow);
			});
		},
		locationList() {
			return this.critters.reduce((acc, critter) => {
				if (!(acc.some(location => location.text === critter.location))) {
					return [
						...acc,
						{
							value: critter.location.toLowerCase(),
							text: critter.location
						}
					];
				} else {
					return acc;
				}
			}, 
			[
				{
				value: '',
				text: 'All'
				}
			]);
		}
	},
	beforeMount() {
		this.selectedMonth = new Date().getMonth() + 1;
	},
	methods: {
		checkCritterIsNew(months) {
			const lastMonth = this.selectedMonth === 1 ? 12 : this.selectedMonth - 1;
			return !(months.includes(lastMonth));
		}
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
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
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