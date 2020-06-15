<template>
	<section class="critter-list">
		<header class="critter-list-header">
			<h2 class="heading-boxed">
				{{ $route.params.type }}
			</h2>
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
				<div class="checkbox-group">
					<cp-checkbox 
						id="checkboxNow"
						v-model="isNow"
						circle
						label-tooltip-text="Catchable now"
					>
						🕐
					</cp-checkbox>
					<cp-checkbox 
						id="checkboxNewMonth"
						v-model="isNewMonth"
						circle
						label-tooltip-text="New this month"
					>
						🆕
					</cp-checkbox>
					<cp-checkbox 
						id="checkboxLastMonth"
						v-model="isLastMonth"
						circle
						label-tooltip-text="Leaving next month"
					>
						👋
					</cp-checkbox>
				</div>
			</div>
		</header>
		<fieldset class="critter-list-filter-layout radio-group">
			<legend class="sr-only">
				Select a layout
			</legend>
			<cp-radio 
				id="layoutGrid"
				v-model="selectedLayout"
				label-tooltip-text="Grid"
				name="layout" 
				type="radio" 
				value="grid"
			>
				<svg 
					class="radio-layout-icon radio-layout-grid-icon"
					viewBox="0 0 50 50"
				>
					<path class="radio-layout-path" d="M19,23H9c-2.21,0-4-1.79-4-4V9c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C23,21.21,21.21,23,19,23z"/>
					<path class="radio-layout-path" d="M41,23H31c-2.21,0-4-1.79-4-4V9c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C45,21.21,43.21,23,41,23z"/>
					<path class="radio-layout-path" d="M19,45H9c-2.21,0-4-1.79-4-4V31c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C23,43.21,21.21,45,19,45z"/>
					<path class="radio-layout-path" d="M41,45H31c-2.21,0-4-1.79-4-4V31c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C45,43.21,43.21,45,41,45z"/>
				</svg>
			</cp-radio>

			<cp-radio 
				id="layoutTable"
				v-model="selectedLayout"
				label-tooltip-text="Table"
				name="layout" 
				type="radio" 
				value="table"
			>
				<svg 
					class="radio-layout-icon radio-layout-table-icon"
					viewBox="0 0 50 50"
				>
					<path class="radio-layout-path" d="M11,16H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,14.21,13.21,16,11,16z"/>
					<path class="radio-layout-path" d="M11,30H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,28.21,13.21,30,11,30z"/>
					<path class="radio-layout-path" d="M11,44H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,42.21,13.21,44,11,44z"/>
					<path class="radio-layout-path" d="M41,16H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,14.21,43.21,16,41,16z"/>
					<path class="radio-layout-path" d="M41,30H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,28.21,43.21,30,41,30z"/>
					<path class="radio-layout-path" d="M41,44H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,42.21,43.21,44,41,44z"/>
				</svg>
			</cp-radio>
		</fieldset>
		<transition-group
			v-if="selectedLayout === 'grid'"
			class="critter-list-content"
			name="critter-transition"
			tag="ul"
		>
			<cp-critter
				v-for="critter in displayedCritters"
				:id="critter.id"
				:key="critter.id"
				:badge="checkCritterIsNewMonth(critter['months'][selectedHemis])"
				:image="critterImage"
				:name="critter.name"
			/>
		</transition-group>
		<cp-critter-table 
			v-else
			:data="displayedCritters" 
			:image="critterImage"
		/>
	</section>
</template>

<script>
import critterImage from '../assets/acnh-fish-sprites.png';
import CpCheckbox from '../components/Checkbox.vue';
import CpCritter from '../components/Critter.vue';
import CpCritterTable from '../components/CritterTable.vue';
import CpRadio from '../components/Radio.vue';
import CpSelector from '../components/Selector.vue';
import { data } from '../data/fish.json';

export default {
	name: 'CpCritterList',
	components: {
		CpCheckbox,
		CpCritter,
		CpCritterTable,
		CpRadio,
		CpSelector
	},
	data() {
		return {
			critterImage,
			critters: data,
			isLastMonth: false,
			isNewMonth: false,
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
					(!this.isNow || isAvailNow) &&
					(!this.isNewMonth || this.checkCritterIsNewMonth(critter['months'][this.selectedHemis])) &&
					(!this.isLastMonth || this.checkCritterIsLastMonth(critter['months'][this.selectedHemis]));
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
	watch: {
		isNewMonth() {
			if (this.isNewMonth) {
				this.isLastMonth = false;
			}
		},
		isLastMonth() {
			if (this.isLastMonth) {
				this.isNewMonth = false;
			}
		}
	},
	beforeMount() {
		this.selectedMonth = new Date().getMonth() + 1;
	},
	methods: {
		checkCritterIsNewMonth(months) {
			const lastMonth = this.selectedMonth === 1 ? 12 : this.selectedMonth - 1;
			return !(months.includes(lastMonth));
		},
		checkCritterIsLastMonth(months) {
			const nextMonth = this.selectedMonth === 12 ? 1 : this.selectedMonth + 1;
			return !(months.includes(nextMonth));
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
		margin-top: var(--spacer);
	}

	&-filter {
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		padding: var(--spacer-lg) var(--spacer);
		// margin-bottom: var(--spacer);
		border-radius: $border-radius;
		background-color: var(--grey-tint);
	}

	&-filter-layout {
		margin-top: calc(-1 * var(--spacer));
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

.radio-layout {
	&-path {
		fill: currentColor;
	}

	&-icon {
		height: 2rem;
		width: 2rem;
	}
}
</style>