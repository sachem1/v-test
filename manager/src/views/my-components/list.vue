<template>
    <div style="clear: both;">
        <Alert type="error" v-show="error">{{error}}</Alert>
        <span>asd</span>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'list',
    props: {
        value: {
            default: ''
        },
        conditions: {            
            type: Array,
            default: function () { return []; }
        },
        propertyFilter: {
            default: function () {
                return [];
            }
        }
    },
    data () {
        return {
            conditionsForBind: [],
            error: '',
            expressionForBind: '',
            isInited: false,
            propertyList: [],
            operatorMap: []
        };
    },
    async created () {
        await this.init();
    },
    methods: {
        async init () {
            
        }
    },
    watch: {
    }
};
</script>