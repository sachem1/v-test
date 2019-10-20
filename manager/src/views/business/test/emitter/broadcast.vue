<template>
	<div>
		<Button @click="handleBroadcast">广播事件</Button>
	</div>
</template>

<script>
	export default {
	    name: 'broadcast',
	    methods: {
	        handleBroadcast () {
	            this.broadcast('dispatch', 'entDispatch', '发消息了');
	        },
	        test () {
	            console.log('打印broadcast日志');
	        }
	    }
	};
</script>

<style>
</style>