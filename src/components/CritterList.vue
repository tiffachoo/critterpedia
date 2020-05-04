<template>
	<div class="critter-list">
		<h1>
			Critters
		</h1>
		<!-- <input type="radio"> -->
		<ul class="critter-list-content">
			<critter
				v-for="critter in critters"
				:key="critter.id"
				:name="critter.name"
			/>
		</ul>
		<!-- <table></table> -->
	</div>
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
			critters: data
		}
	}
}
</script>

<style lang="scss">
.critter-list {
	flex: 0 0 100%; 

	&-content {
		display: grid;
		grid-gap: var(--spacer);
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}
}
</style>