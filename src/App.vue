<template>
	<div id="app">
		<div class="container">
			<div class="critter-background"></div>
			<cp-nav />
			<main class="main">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script>
import CpNav from './components/Nav'
export default {
	name: 'App',
	components: {
		CpNav
	}
}
</script>

<style lang="scss">
@import 'styles/styles';
</style>
