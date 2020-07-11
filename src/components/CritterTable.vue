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
					<th>
						Time
					</th>
					<th>
						Months
					</th>
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
							:image="image"
							:name="critter.name"
							tag="div"
						/>
					</td>
					<td>
						{{ formatNumber(critter.price) }}
					</td>
					<td>
						{{ critter.location }} 
						<span v-if="critter.locationDetail">({{ critter.locationDetail }})</span>
					</td>
					<td>
						{{ displayTimes(critter.time.start, critter.time.end) }}
						<template v-if="critter.time.start2">
							<br>{{ displayTimes(critter.time.start2, critter.time.end2) }}
						</template>
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
import CpCritter from './Critter.vue';
export default {
	name: 'CpCritterTable',
	components: {
		CpCritter
	},
	props: {
		data: Array,
		image: String
	},
	data() {
		return {
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
%th {
	font-family: $heading-font-family;
	font-size: 1rem;
	color: var(--th-color);
	text-align: left;
}

.critter-table {
	--th-color: var(--primary-color-darkest);

	position: relative;
	width: 100%;

	th:not(.critter-table-th-sort),
	td,
	&-th-sort-button {
		padding: var(--spacer-sm);
	}

	tr {
		border-bottom: 1px dashed var(--primary-color);
		// border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><rect x="0.5" y="0.5" width="14" height="14" style="fill:none;stroke:%23d1bc41;stroke-linecap:round;stroke-miterlimit:10;stroke-dasharray:3,4;"/></svg>') 10% stretch;
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
			cursor: pointer;

			&::after {
				content: '';
				height: 1ch;
				width: 1ch;
				background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="45.41" height="34.92" viewBox="0 0 45.41 34.92"><path d="M25.19,33.61l19.7-28.92C46.24,2.7,44.82,0,42.41,0H3.01C0.6,0-0.83,2.7,0.53,4.69l19.7,28.92 C21.42,35.36,23.99,35.36,25.19,33.61z" style="fill:%23d1bc41;"/></svg>');
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: center;
				transform: var(--th-sort-rotate, rotateX(180deg));
				transition: $scale-transition;
				opacity: var(--th-sort-opacity, 0);
			}

			&:hover {
				--th-color: var(--primary-color-dark);
				--th-sort-opacity: 0.5;
			}

			&.asc,
			&.desc {
				--th-sort-opacity: 1;
			}

			&.desc {
				--th-sort-rotate: rotateX(0deg);
			}
		}
	}

	> thead {
		th {
			@extend %th;

			position: sticky;
			z-index: 10;
			top: 0;
			box-shadow: 0 $border-width 0 var(--primary-color);
			background-color: var(--white);
		}
	}

	> tbody {
		td {
			font-size: 1.125rem;
			vertical-align: middle;
		}

		tr {
			&:nth-child(odd) {
				background-color: var(--primary-color-tint);
			}

			&:hover {
				@include diagPattern;
			}
		}
	}

	&-wrap {
		@media (max-width: $lg - 1) {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
	
			.critter-table {
				min-width: 650px;
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
		text-align: left;

		&-image-wrap {
			flex-shrink: 0;
			margin-bottom: 0;
			margin-right: var(--spacer);
		}
	}
}
</style>