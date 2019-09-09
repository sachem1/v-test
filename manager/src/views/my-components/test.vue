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
    async created() {
        var vm = this;
        var enumItems = await vm.$store.dispatch({
            type: 'customer/getProductFieldList',
            query: {"productId": "1036531610482181120"}
        });
        console.log(enumItems);
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