import Vue from 'vue';
import Router from 'vue-router';
import main from './pages/CritterList.vue';

export default new Router({
	routes: [
		{
			path: '/',
			component: main
		},
		{
			path: '/:type',
			component: main
		}
	],
	linkActiveClass: 'active'
});

Vue.use(Router);