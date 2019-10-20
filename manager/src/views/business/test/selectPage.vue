<template>

	<Card style="width:500px; height:300px;">
		<Row>
			<Col span="12"
					 style="padding-right:10px">
			<Select v-model="model11"
							filterable>
				<virtual-List :size="30"
											:remain="6">
					<Option v-for="item in provinceList"
									:value="item.value"
									:key="item.value">{{ item.label }}</Option>
				</virtual-List>
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
	import VirtualList from 'vue-virtual-scroll-list';
	import { doCustomTimes } from '@/libs/tools';
	export default {
	    components: { VirtualList },
	    data () {
	        return {
	            provinceList: [

	            ],
	            cityList: [],
	            model11: '',
	            model12: ''
	        };
	    },
	    created: function () {
	    },
	    watch: {
	        model11: function () {
	            this.getCityList();
	        }
	    },
	    mounted () {
	        let list = [];
	        doCustomTimes(1000, (index) => {
	            list.push({
	                label: `select${index}`,
	                value: index
	            });
	        });
	        this.provinceList = list;
	    },
	    methods: {
	        getCityList () {
	            let provinceId = this.model11;
	            this.$store.dispatch({
	                type: 'trade/getCityList',
	                data: provinceId
	            }).then(res => {
	                this.cityList = res.filter(function (item) {
	                    return item.parentValue === provinceId;
	                });
	            });
	        },
	        getProvinceList () {
	            this.$store.dispatch({
	                type: 'trade/getProvinceList'
	            }).then(res => {
	                this.provinceList = res;
	            });
	        }
	    }

	};
</script>
