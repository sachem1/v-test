<template>
	<div>
		<Select v-model="selectVal"
						filterable
						@on-change="getValue">
			<Option v-for="item in dataList"
							:value="item.value"
							:key="item.value">{{ item.label }}</Option>
		</Select>
	</div>
</template>

<script>
	import axios from '_lib';
	import util from '_lib/util';
	import { forEach } from '_lib/tools';
	export default {
	    name: 'custom_select',
	    props: {
	        url: String,
	        parentValue: String,
	        hasDefaultSelect: Boolean
	    },
	    data () {
	        return {
	            selectVal: '',
	            dataList: []
	        };
	    },
	    mounted () {
	        this.InitSelectData();
	    },
	    methods: {
	        InitSelectData () {
	            let list = [];
	            axios
	                .request({
	                    url: this.url,
	                    data: { parentValue: this.parentValue },
	                    method: 'post'
	                })
	                .then(res => {
	                    var data = util.wrapResult(res);
	                    forEach(data, el => {
	                        list.push(el);
	                    });
	                })
	                .catch(err => {
	                    this.$Message.error(err);
	                });

	            if (this.hasDefaultSelect) {
	                list.push({ label: '--请1选择--', value: '' });
	            }
	            this.dataList = list;
	        },
	        getValue (val) {
	            this.$emit('input', val);
	        }
	    }
	};
</script>