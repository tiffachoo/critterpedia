<template>
	<div class="critter-table-wrap">
		<table class="critter-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Location</th>
					<th>Price</th>
					<th>Time</th>
					<th>Months</th>
				</tr>
			</thead>
			<tbody>
				<tr 
					v-for="critter in data"
					:key="critter.id"
				>
					<td>
						{{ critter.name }}
					</td>
					<td>
						{{ critter.location }}
					</td>
					<td>
						{{ critter.price }}
					</td>
					<td>
						{{ displayTimes(critter.time.start, critter.time.end) }}
					</td>
					<td>
						{{ critter['months'][selectedHemis] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'CpCritterTable',
	props: {
		data: Array
	},
	data() {
		return {
			selectedHemis: 'south' // temporary
		}
	},
	computed: {
	},
	methods: {
		displayTimes(start, end) { 
			if (start === 0 && end === 24) {
				return 'All day';
			} else {
				return `${start}:00 to ${end}:00`;
			}
		}
	}
}
</script>

<style lang="scss">
.critter-table {
	width: 100%;

	th,
	td {
		padding: var(--spacer-sm);
	}

	> thead {
		th {
			color: var(--primary-color-darkest);
			text-align: left;
		}
	}

	> tbody {
		td {
			font-size: 1.125rem;
		}

		tr {
			border-bottom: 1px dashed var(--primary-color);
			// border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><rect x="0.5" y="0.5" width="14" height="14" style="fill:none;stroke:#FF1D1D;stroke-linecap:round;stroke-miterlimit:10;stroke-dasharray:3,4;"/></svg>') 10% stretch;

			&:hover {
				@include diagPattern;

				color: var(--white);
			}
		}
	}
}
</style>