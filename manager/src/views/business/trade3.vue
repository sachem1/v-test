<template>
	<div>
		<Button type="primary"
						@click="modal1 = true">Display dialog box</Button>
		<Modal v-model="modal1"
					 title="test"
					 @on-ok="ok"
					 @on-cancel="cancel">
			<p>Content of dialog</p>
		</Modal>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	            modal1: false
	        };
	    },
	    methods: {
	        ok () {
	            this.$Message.info('Clicked ok');
	        },
	        cancel () {
	            this.$Message.info('Clicked cancel');
	        }
	    }
	};
</script>
