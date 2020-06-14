<template>
	<div class="critter-table-wrap">
		<table class="critter-table">
			<thead>
				<tr>
					<th 
						:aria-sort="sortKey === 'name' ? `${sortDirection}ending` : null"
						class="critter-table-th-sort"
					>
						<button 
							:class="{ [sortDirection]: sortKey === 'name' }"
							class="critter-table-th-sort-button"
							@click="sortColumn('name')"
						>
							Name
						</button>
					</th>
					<th
						:aria-sort="sortKey === 'location' ? `${sortDirection}ending` : null"
						class="critter-table-th-sort"
					>
						<button 
							:class="{ [sortDirection]: sortKey === 'location' }"
							class="critter-table-th-sort-button"
							@click="sortColumn('location')"
						>
							Location
						</button>
					</th>
					<th
						:aria-sort="sortKey === 'price' ? `${sortDirection}ending` : null"
						class="critter-table-th-sort"
					>
						<button 
							:class="{ [sortDirection]: sortKey === 'price' }"
							class="critter-table-th-sort-button"
							@click="sortColumn('price')"
						>
							Price
						</button>
					</th>
					<th>Time</th>
					<th>Months</th>
				</tr>
			</thead>
			<tbody>
				<tr 
					v-for="critter in sortedData"
					:key="critter.id"
				>
					<td>
						<cp-critter
							:id="critter.id"
							:hover-pattern="false"
							:image="critterImage"
							:name="critter.name"
							tag="div"
						/>
						<!-- {{ critter.name }} -->
					</td>
					<td>
						{{ critter.location }} 
						<span v-if="critter.locationDetail">({{ critter.locationDetail }})</span>
					</td>
					<td>
						{{ formatNumber(critter.price) }}
					</td>
					<td>
						{{ displayTimes(critter.time.start, critter.time.end) }}
					</td>
					<td>
						{{ displayMonths(critter['months'][selectedHemis]) }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import critterImage from '../assets/acnh-fish-sprites.png';
import CpCritter from './Critter.vue';
export default {
	name: 'CpCritterTable',
	components: {
		CpCritter
	},
	props: {
		data: Array
	},
	data() {
		return {
			critterImage, // temporary
			sortKey: '',
			sortDirection: '',
			selectedHemis: 'north' // temporary
		}
	},
	computed: {
		sortedData() {
			return [...this.data].sort((critterA, critterB) => {
				if (critterA[this.sortKey] < critterB[this.sortKey]) {
					return this.sortDirection === 'asc' ? -1 : 1;

				} else if (critterA[this.sortKey] > critterB[this.sortKey]) {
					return this.sortDirection === 'asc' ? 1 : -1;

				} else {
					return 0;
				}
			});
		}
	},
	methods: {
		displayTimes(start, end) { 
			if (start === 0 && end === 24) {
				return 'All day';
			} else {
				return `${start}:00 to ${end}:00`;
			}
		},
		displayMonths(months) {
			const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			if (months.length === 12) {
				return 'All months';
			} else {
				return months.map(month => monthsMap[month - 1]).join(', ');
			}
		},
		formatNumber(number) {
			return new Intl.NumberFormat('en-CA').format(number);
		},
		sortColumn(key) {
			this.sortDirection = (this.sortKey === key && this.sortDirection === 'asc') ? 'desc' : 'asc';
			this.sortKey = key;
		}
	}
}
</script>

<style lang="scss">
.critter-table {
	width: 100%;

	%th {
		font-family: $primary-font-family;
		font-size: 1rem;
		color: var(--primary-color-darkest);
		text-align: left;
	}

	th:not(.critter-table-th-sort),
	td,
	&-th-sort-button {
		padding: var(--spacer-sm);
	}

	&-th-sort {
		&-button {
			@extend %th;

			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			border: 0;
			background-color: transparent;

			&.asc {
				&::after {
					content: '👆';
				}
			}

			&.desc {
				&::after {
					content: '👇';
				}
			}
		}
	}

	> thead {
		th {
			@extend %th;
		}
	}

	> tbody {
		td {
			font-size: 1.125rem;
			vertical-align: middle;
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

	.critter {
		--critter-size: 3rem;
		--critter-background-color: transparent;
		--critter-circle-background-color: var(--primary-color-tint);
		--critter-font-size: inherit;

		flex-direction: row;
		justify-content: start;
		padding: 0;

		&-image-wrap {
			margin-bottom: 0;
			margin-right: var(--spacer);
		}
	}
}
</style>