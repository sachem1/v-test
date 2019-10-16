<!--子组件-->
<template>
	<div>
		<slot name="left"></slot><h3>我是子组件一</h3><slot name="right"></slot>
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