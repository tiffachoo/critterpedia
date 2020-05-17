<template>
	<div id="app">
		<div class="container container-grid">
			<header class="header">
				<h1>
					Critterpedia
				</h1>
			</header>
			<nav class="nav">
				<cp-button
					class="nav-link"
					to="/bugs"
				>
					Bugs
				</cp-button>
				<cp-button
					class="nav-link"
					to="/fish"
				>
					Fish
				</cp-button>
			</nav>
			<main class="main">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script>
import CpButton from './components/Button'
export default {
	name: 'App',
	components: {
		CpButton
	}
}
</script>

<style lang="scss">
@import 'styles/styles';
</style>
