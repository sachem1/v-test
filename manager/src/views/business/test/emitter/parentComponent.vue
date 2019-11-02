<template>
	<div>
		dddd
		<dispatch-d></dispatch-d>
	</div>
</template>

<script>
	import dispatchD from './dispatch';
	export default {
	    name: 'parentComponent',
	    components: {
	        dispatchD
	    },
	    data () {
	        return {

	        };
	    },
	    methods: {
	        handleEvent (data) {
	            console.log(data);
	        }
	    }
	};
</script>

<style>
</style>