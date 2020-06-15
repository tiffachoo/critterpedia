<template>
	<div id="app">
		<div class="container container-grid">
			<header class="header">
				<h1>
					Critterpedia
				</h1>
			</header>
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
