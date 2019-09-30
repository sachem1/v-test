<template>

    <Card style="width:500px; height:300px;">
    <Row>
        <Col span="12" style="padding-right:10px">
            <Select v-model="model11" filterable>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

        </Col>
        <Col span="12">
            <Select v-model="model12" filterable multiple>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>
    </Row>
    <Row><Button @click="getCityList">加载</Button></Row>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model11: '',
                model12: []
            }
        },
        methods:{
            getCityList(){
                this.$store.dispatch({
                    type:'trade/getCityList'
                }).then(res=>{
                    debugger;
                    cityList=res.data;
                })
            }
        }
        
    }
</script>
