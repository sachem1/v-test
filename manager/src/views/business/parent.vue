<!--父组件-->
<template>
	<div>
		<h2>父组件</h2>
		<br>
		<child @childEvent="parentMethod"></child>
	</div>
</template>
<script>
	import child from './child';

	export default {
		components: {
			child,
		},
		data () {
			return {
				parentMessage: '我是来自父组件的消息'
			};
		},
		methods: {
			parentMethod ({ name, age }) {
				console.log(this.parentMessage, name, age);
			},
		},
	};
</script>
<style scoped>
</style>