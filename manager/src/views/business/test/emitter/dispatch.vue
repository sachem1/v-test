<template>
	<div>
		<Button @click="handleDispatch">触发事件</Button>
	</div>
</template>

<script>
	import Emitter from 'view-design/mixins/emitter';
	export default {
	    name: 'dispatchA',
	    mixins: [Emitter],
	    methods: {
	        handleDispatch () {
	            this.dispatch('broadcast', 'test', 'ddd');
	        },
	        entDispatch () {
	            console.log('打印了dispatch 消息');
	        }
	    }
	};
</script>

<style>
</style>