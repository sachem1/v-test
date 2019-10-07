<template>

	<Card style="width:500px; height:300px;">
		<Row>
			<Col span="12"
					 style="padding-right:10px">
			<Select v-model="model11"
							filterable>
				<Option v-for="item in provinceList"
								:value="item.value"
								:key="item.value">{{ item.label }}</Option>
			</Select>

			</Col>
			<Col span="12">
			<Select v-model="model12"
							filterable
							multiple>
				<Option v-for="item in cityList"
								:value="item.value"
								:key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
		</Row>
		<Row><Button @click="getProvinceList">加载</Button></Row>
	</Card>
</template>
<script>
	export default {
	    data () {
	        return {
	            provinceList: [
	                {
	                    value: 'test',
	                    label: '浙江省'
	                }
	            ],
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
	                }
	            ],
	            model11: '',
	            model12: ''
	        };
	    },
	    created: function () {
	        this.getProvinceList();
	    },
	    watch: {
	        model11: function () {
	            this.getCityList();
	        }
	    },
	    methods: {
	        getCityList () {
	            let provinceId = this.model11;
	            this.$store.dispatch({
	                type: 'trade/getCityList',
	                data: provinceId
	            }).then(res => {
	                this.cityList = res.data.Result.filter(function (item) {
	                    return item.parentValue === provinceId;
	                });
	            });
	        },
	        getProvinceList () {
	            this.$store.dispatch({
	                type: 'trade/getProvinceList'
	            }).then(res => {
	                this.provinceList = res.data.Result;
	            });
	        }
	    }

	};
</script>
