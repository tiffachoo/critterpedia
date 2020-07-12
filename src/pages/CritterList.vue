<template>
	<div class="critter-list">
		<div class="critter-list-aside">
			<div class="critter-list-aside-sticky">
				<header class="header">
					<h1>
						Critter<wbr>pedia
					</h1>
				</header>
				<div class="critter-list-filter">
					<cp-selector 
						id="selectMonth"
						v-model.number="selectedMonth"
						:options="months"	
						label="Month"
					/>
					<cp-selector 
						id="selectLocation"
						v-model="selectedLocation"
						:options="locationList"	
						label="Location"
					/>
					<div class="checkbox-group">
						<cp-checkbox 
							id="checkboxNow"
							v-model="isNow"
							circle
							label-tooltip-text="Catchable now"
						>
							<svg 
								class="checkbox-filter-icon"
								viewBox="0 0 50 50"
							>
								<path class="checkbox-path" d="M25,9C15.06,9,7,17.06,7,27c0,9.94,8.06,18,18,18s18-8.06,18-18C43,17.06,34.94,9,25,9z M32.1,33.17 c-0.4,0.46-0.95,0.69-1.51,0.69c-0.46,0-0.93-0.16-1.31-0.49l-5.59-4.86c-0.02-0.02-0.03-0.03-0.05-0.05 c-0.05-0.05-0.1-0.1-0.14-0.15c-0.04-0.05-0.08-0.09-0.12-0.14c-0.04-0.05-0.07-0.11-0.1-0.16c-0.03-0.06-0.07-0.11-0.09-0.17 c-0.03-0.06-0.05-0.12-0.07-0.18c-0.02-0.06-0.04-0.13-0.06-0.19c-0.01-0.06-0.02-0.12-0.03-0.18c-0.01-0.07-0.02-0.14-0.02-0.21 c0-0.02-0.01-0.04-0.01-0.07V14.29c0-1.1,0.9-2,2-2s2,0.9,2,2v11.79l4.91,4.26C32.74,31.08,32.83,32.34,32.1,33.17z"/>
								<path class="checkbox-path" d="M17.64,7.36c-2.51-2.78-6.79-3.1-9.69-0.67c-2.9,2.43-3.32,6.7-1.01,9.66C9.36,12.25,13.13,9.06,17.64,7.36z"/>
								<path class="checkbox-path" d="M43.2,16.57c2.41-2.96,2-7.31-0.93-9.77c-2.89-2.42-7.15-2.11-9.67,0.65C37.09,9.2,40.82,12.44,43.2,16.57z"/>
							</svg>
						</cp-checkbox>
						<cp-checkbox 
							id="checkboxNewMonth"
							v-model="isNewMonth"
							circle
							label-tooltip-text="New this month"
						>
							<svg 
								class="checkbox-filter-icon"
								viewBox="0 0 50 50"
							>
								<path class="checkbox-path" d="M5,20v22c0,2.21,1.79,4,4,4h32c2.21,0,4-1.79,4-4V20H5z M33.63,31.28l-2.91,2.84c-0.29,0.28-0.42,0.69-0.36,1.09l0.69,4.01 c0.17,1.01-0.89,1.78-1.79,1.3l-3.6-1.89c-0.36-0.19-0.79-0.19-1.15,0l-3.6,1.89c-0.91,0.48-1.97-0.29-1.79-1.3l0.69-4.01 c0.07-0.4-0.06-0.81-0.36-1.09l-2.91-2.84c-0.73-0.72-0.33-1.96,0.69-2.11l4.03-0.58c0.4-0.06,0.75-0.31,0.93-0.68l1.8-3.65 c0.45-0.92,1.76-0.92,2.22,0l1.8,3.65c0.18,0.36,0.53,0.62,0.93,0.68l4.03,0.58C33.95,29.31,34.36,30.56,33.63,31.28z"/>
								<path class="checkbox-path" d="M41,8h-5V5c0-1.1-0.9-2-2-2h-1c-1.1,0-2,0.9-2,2v3H19V5c0-1.1-0.9-2-2-2h-1c-1.1,0-2,0.9-2,2v3H9c-2.21,0-4,1.79-4,4v6h40 v-6C45,9.79,43.21,8,41,8z"/>
							</svg>
						</cp-checkbox>
						<cp-checkbox 
							id="checkboxLastMonth"
							v-model="isLastMonth"
							circle
							label-tooltip-text="Leaving next month"
						>
							<svg 
								class="checkbox-filter-icon"
								viewBox="0 0 50 50"
							>
								<path class="checkbox-path" d="M39.97,10H41c1.1,0,2-0.9,2-2V7c0-1.1-0.9-2-2-2H9C7.9,5,7,5.9,7,7v1c0,1.1,0.9,2,2,2h1.03c0.2,6.49,3.59,12.04,8.46,14.71 c-4.87,2.67-8.26,8.22-8.46,14.71H9c-1.1,0-2,0.9-2,2v1c0,1.1,0.9,2,2,2h32c1.1,0,2-0.9,2-2v-1c0-1.1-0.9-2-2-2h-1.03 c-0.2-6.49-3.59-12.04-8.46-14.71C36.39,22.04,39.78,16.49,39.97,10z M35.78,37.78c0,0.07-0.01,0.15-0.01,0.22H14.23 c0-0.07-0.01-0.15-0.01-0.22c0-4.99,8.3-9.78,10.78-9.78S35.78,32.79,35.78,37.78z"/>
							</svg>
						</cp-checkbox>
					</div>
				</div>
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
							<path class="radio-path" d="M19,23H9c-2.21,0-4-1.79-4-4V9c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C23,21.21,21.21,23,19,23z"/>
							<path class="radio-path" d="M41,23H31c-2.21,0-4-1.79-4-4V9c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C45,21.21,43.21,23,41,23z"/>
							<path class="radio-path" d="M19,45H9c-2.21,0-4-1.79-4-4V31c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C23,43.21,21.21,45,19,45z"/>
							<path class="radio-path" d="M41,45H31c-2.21,0-4-1.79-4-4V31c0-2.21,1.79-4,4-4h10c2.21,0,4,1.79,4,4v10C45,43.21,43.21,45,41,45z"/>
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
							<path class="radio-path" d="M11,16H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,14.21,13.21,16,11,16z"/>
							<path class="radio-path" d="M11,30H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,28.21,13.21,30,11,30z"/>
							<path class="radio-path" d="M11,44H9c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h2c2.21,0,4,1.79,4,4v2C15,42.21,13.21,44,11,44z"/>
							<path class="radio-path" d="M41,16H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,14.21,43.21,16,41,16z"/>
							<path class="radio-path" d="M41,30H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,28.21,43.21,30,41,30z"/>
							<path class="radio-path" d="M41,44H23c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h18c2.21,0,4,1.79,4,4v2C45,42.21,43.21,44,41,44z"/>
						</svg>
					</cp-radio>
				</fieldset>
			</div>
		</div>
		<section class="critter-list-content">
			<header class="critter-list-header">
				<h2 class="heading-boxed">
					{{ $route.params.type }}
				</h2>
			</header>
			<div v-if="displayedCritters.length">
				<transition-group
					v-if="selectedLayout === 'grid'"
					class="critter-list-items"
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
						:to="`${$route.params.type}/${critter.id}`"
					/>
				</transition-group>
				<cp-critter-table 
					v-else
					:data="displayedCritters" 
					:image="critterImage"
				/>
			</div>
			<div 
				v-else
				class="well"
			>
				Sorry! There are no critters available in the specified filters. 😢
			</div>
		</section>
	</div>
</template>

<script>
import CpCheckbox from '../components/Checkbox.vue';
import CpCritter from '../components/Critter.vue';
import CpCritterTable from '../components/CritterTable.vue';
import CpRadio from '../components/Radio.vue';
import CpSelector from '../components/Selector.vue';

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
			critterImage: null,
			critters: null,
			isLastMonth: false,
			isNewMonth: false,
			isNow: false,
			selectedHemis: 'north',
			selectedLayout: 'grid',
			selectedLocation: null,
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
			
			return this.critters ? this.critters.filter(critter => {
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
			}) : [];
		},
		locationList() {
			return this.critters ? this.critters.reduce((acc, critter) => {
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
			]) : [];
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
		},
		'$route'() {
			this.getCritters();

			this.selectedLocation = null;
		}
	},
	beforeMount() {
		this.selectedMonth = new Date().getMonth() + 1;
	},
	created() {
		this.getCritters();
	},
	methods: {
		checkCritterIsNewMonth(months) {
			const lastMonth = this.selectedMonth === 1 ? 12 : this.selectedMonth - 1;
			return !(months.includes(lastMonth));
		},
		checkCritterIsLastMonth(months) {
			const nextMonth = this.selectedMonth === 12 ? 1 : this.selectedMonth + 1;
			return !(months.includes(nextMonth));
		},
		getCritters() {
			Promise.all([
				import(`../data/${this.$route.params.type}.json`),
				import(`../assets/acnh-${this.$route.params.type}-sprites.png`)
			]).then(([json, img]) => {
				this.critters = json.default.data;
				this.critterImage = img.default;
			});
		}
	}
}
</script>

<style lang="scss">
.critter-list {
	--content-offset: 10rem;
	--aside-offset: 7rem;

	@media (max-width: $sm - 1) {
		--content-offset: 2rem;
		--aside-offset: 5rem;
	}

	@media (min-width: $sm) {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	&-items {
		position: relative;
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
		border-radius: $border-radius-sm;
		overflow: hidden;
	}

	&-header { 
		margin-top: -3rem;
		margin-bottom: 1.5rem;

		@media (min-width: $sm) {
			margin-top: -4rem;
			text-align: right;
		}
	}

	&-content {
		grid-column-start: 2;
		min-width: 100%;
		margin-top: var(--content-offset);
		padding: var(--spacer-lg);
		border-radius: $border-radius;
		background-color: var(--white);
	}

	&-filter {
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		align-self: start;
		padding: var(--spacer-lg) var(--spacer);
		border-radius: $border-radius;
		background-color: var(--secondary-color-tint);

		@media (min-width: $sm) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		@media (min-width: $sm) {
			.selector {
				width: calc(100% + var(--spacer-lg));
			}
		}
	}

	&-filter-layout {
		margin-top: calc(-1 * var(--spacer));
		margin-bottom: var(--spacer);
		text-align: right;
	}

	&-aside {
		&-sticky {
			position: sticky;
			top: 0;
			padding-top: var(--aside-offset);
		}
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