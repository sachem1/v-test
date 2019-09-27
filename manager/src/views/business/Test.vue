<template>
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
        }
    }
</script>
