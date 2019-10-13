<template>
	<Card>
		<Form ref="searchModel"
					:label-width="100"
					:model="searchModel"
					inline>
			<Row type="flex"
					 style="margin-left: -12px; margin-right: -12px;">
				<i-col :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Name"
										label="名称">
						<Input type="text"
									 v-model="searchModel.Name"
									 placeholder="名称"></Input>
					</FormItem>
				</i-col>
				<i-col :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Age"
										label="年龄">
						<Input type="text"
									 v-model="searchModel.Age"
									 placeholder="年龄"></Input>
					</FormItem>
				</i-col>
				<i-col v-show="display"
							 :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Address"
										label="地址">
						<Input type="text"
									 v-model="searchModel.Address"
									 placeholder="地址"></Input>
					</FormItem>
				</i-col>
				<i-col v-show="display"
							 :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Name"
										label="名称">
						<Input type="text"
									 v-model="searchModel.Name"
									 placeholder="名称"></Input>
					</FormItem>
				</i-col>
				<i-col v-show="display"
							 :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Age"
										label="年龄">
						<Input type="text"
									 v-model="searchModel.Age"
									 placeholder="年龄"></Input>
					</FormItem>
				</i-col>
				<i-col v-show="display"
							 :sm="24"
							 :md="12"
							 :lg="8">
					<FormItem prop="Address"
										label="地址">
						<Input type="text"
									 v-model="searchModel.Address"
									 placeholder="地址"></Input>
					</FormItem>
				</i-col>
				<i-col class="ivu-text-right"
							 style="padding-left: 12px; padding-right: 12px;"
							 :sm="{ span: 24, offset: 1 }"
							 :md="{ span: 12, offset: 2 }"
							 :lg="{ span: 8, offset: display?16:0 }">
					<FormItem>
						<Button icon="android-search"
										type="primary"
										@click="handleSearch()">查询</Button>
						<Button class="ivu-ml-8"
										icon="android-search"
										@click="handleSearch()">重置</Button>
						<a class="ivu-ml-8"
							 style="font-size: 14px;"
							 @click="handleClick()">
							{{displayName}} <i class="triggerArrow()"></i></a>
					</FormItem>
				</i-col>
			</Row>
		</Form>
	</Card>
</template>

<script>
	export default {
	    name: 'search-page',
	    data () {
	        return {
	            displayAccordion: '',
	            searchModel: {
	                Name: '',
	                Age: '',
	                Address: ''
	            },
	            display: false,
	            displayName: '展开'
	        };
	    },
	    methods: {
	        handleSearch () {
	            this.$emit('searchList', this.searchModel);
	        },
	        handleClick () {
	            if (this.display) {
	                this.displayName = '展开';
	                this.display = false;
	            } else {
	                this.display = true;
	                this.displayName = '收起';
	            }
	        },
	        triggerArrow () {
	            if (this.display) {
	                return 'ivu-icon ivu-icon-ios-arrow-up';
	            } else {
	                return 'ivu-icon ivu-icon-ios-arrow-down';
	            }
	        }
	    }
	};
</script>
