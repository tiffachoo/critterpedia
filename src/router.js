import { createRouter, createWebHistory} from 'vue-router';
import List from './pages/CritterList.vue';
import Detail from './pages/CritterDetail.vue';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: List
		},
		{
			path: '/:type',
			component: List
		},
		{
			path: '/:type/:id',
			component: Detail
		}
	],
	linkExactActiveClass: 'active'
});
