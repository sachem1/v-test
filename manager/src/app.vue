<template>
	<div id="main"
			 class="app-main">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
	    data () {
	        return {
	            theme: this.$store.state.app.themeColor
	        };
	    },
	    mounted () {

	    },
	    created () {
	        console.log('init menu');
	        // let routes = this.$store.state.app.routers;
	        // this.$router.addRoutes(routes);
	        // this.$router.options.routes.push(routes);
	    },
	    beforeDestroy () {

	    },
	    methods: {

	    }
	};
</script>

<style>
html,
body {
	width: 100%;
	height: 100%;
	background: #f0f0f0;
	overflow: hidden;
}
.app-main {
	width: 100%;
	height: 100%;
}
</style>
