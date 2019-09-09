<template>
    <RadioGroup :value.sync="modelValue" @on-change="onChange">
        <Radio v-for="(item, index)  in options" :key="index" :label="item.value">{{ item.label }}</Radio>
    </RadioGroup>
</template>
<script>
export default {
    name: 'subradio',
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