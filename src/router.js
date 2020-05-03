import Vue from 'vue';
import Router from 'vue-router';
import home from './components/CritterList.vue';

export default new Router({
	routes: [
		{
			path: '/',
			component: home
		}
	]
});

Vue.use(Router);