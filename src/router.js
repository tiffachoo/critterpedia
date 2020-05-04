import Vue from 'vue';
import Router from 'vue-router';
import main from './components/CritterList.vue';

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
	]
});

Vue.use(Router);