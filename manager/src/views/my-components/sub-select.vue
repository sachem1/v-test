<template>
    <i-select :value.sync="modelValue" :label-in-value="labelInValue" transfer :clearable="clearable" @on-change="onChange">
        <i-option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</i-option>
    </i-select>
</template>
<script>
export default {
    name: 'subselect',
    props: {
        modelValue: {           
            required: true
        },
        options: {
            required: true
        },
        labelInValue: {
            default: false
        },
        clearable: {
            default: false
        }
    },
    methods: {
        onChange: function (newValue) {
            this.$emit('on-change', newValue);
        }
    }
};
</script>