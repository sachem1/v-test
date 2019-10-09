<template>
    <div>
        
    </div>
</template>
<script>
import Vue from 'vue';


export default {
    name: 'commonPage',
    data() {
        return {
            inlinePageModelVisible: false,
            inlinePageModelTitle: ''
        };
    },  
    methods: {
        showInlinePageModel(payload) {
            var argu = { id: payload.Id };
            var routeName = payload.metaFileName;

            this.$router.push({
                name: routeName,
                params: argu
            });
        }
    }
}
</script>