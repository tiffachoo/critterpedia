<template>
	<div id="app">
		<div class="container">
			<header class="header">
				<h1>
					Critters
				</h1>
			</header>
			<nav class="nav">
				<router-link
					class="nav-link"
					to="/bugs"
				>
					<span class="nav-link-text">Bugs</span>
				</router-link>
				<router-link
					class="nav-link"
					to="/fish"
				>
					<span class="nav-link-text">Fish</span>
				</router-link>
			</nav>
			<main class="main">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {
	}
}
</script>

<style lang="scss">
@import 'styles/styles';
</style>
