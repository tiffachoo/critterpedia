<template>
	<section class="critter-list">
		<header>
			<h2>
				{{ $route.params.type }}
			</h2>
		</header>
		<!-- filters: table / grid view, north / south, location, month, time(?) -->
		<!-- <div class="critter-filter">
			<input type="radio" >
		</div> -->
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
import Critter from './Critter.vue'
import { data } from '../data/fish.json';

export default {
	name: 'CritterList',
	components: {
		Critter,
	},
	data() {
		return {
			critters: data,
			selectedMonth: '',
			selectedHemis: 'south',
			selectedLocation: '',
			selectedLayout: 'grid'
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