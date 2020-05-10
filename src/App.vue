<template>
	<div id="app">
		<div class="container container-grid">
			<header class="header">
				<h1>
					Critterpedia
					<small 
						v-if="$route.params.type"
						class="h1-small"
					>
						{{ $route.params.type }}
					</small>
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
