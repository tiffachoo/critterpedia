import Vue from 'vue';
import Router from 'vue-router';
import List from './pages/CritterList.vue';
import Detail from './pages/CritterDetail.vue';

export default new Router({
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

Vue.use(Router);