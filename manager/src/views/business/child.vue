<!--子组件-->
<template>
	<div>
		<h3>我是子组件一</h3>
	</div>
</template>
<script>
	export default {
		mounted () {
			this.$emit('childEvent', { name: '我来自子组件 test', age: 10 });
		},
	};
</script>
<style scoped>
</style>