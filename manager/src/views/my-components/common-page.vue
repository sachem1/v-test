<template>
    <div>
        <can-edit-table @on-request-inline-page="showInlinePageModel"></can-edit-table>
        <Modal width="1000" v-if="inlinePageModelVisible" v-model="inlinePageModelVisible" :title="inlinePageModelTitle" class-name="vertical-center-modal">    
            <div class="half-col" style="overflow: hidden;">
                <can-edit-table :isInline="true" :pageSize="5"></can-edit-table>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import Vue from 'vue';
import canEditTable from './../my-components/can-edit-table.vue';

Vue.component('can-edit-table', canEditTable);

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