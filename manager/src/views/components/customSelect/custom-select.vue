<template>
<div>
     <Select v-model="model11" filterable>
                <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
</div>
</template>

<script>
export default {
    name:'select',
    data(){
        return {
            dataList:[
                {
                    value: '1',
                    label: '张三'
                },
                {
                    value: '2',
                    label: '李四'
                },{
                    value: '3',
                    label: '王五'
                },{
                    value: '4',
                    label: '赵六'
                }
                ,{
                    value: '5',
                    label: '田七'
                }
            ]
        }
    },
    props:{
        
    }
}
</script>