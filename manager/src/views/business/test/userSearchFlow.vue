<template>
	<div class="ivu-card-body">
		<Collapse accordion
							v-model="displayAccordion">
			<Panel name="1">
				查询
				<div slot="content">
					<div class="ivu-row-flex ivu-row-flex-end">
						<Form ref="searchModel"
									:label-width="100"
									:model="searchModel"
									:rules="searchRules"
									inline>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Name"
													label="名称">
									<Input type="text"
												 v-model="searchModel.Name"
												 placeholder="名称"></Input>
								</FormItem>
							</div>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Age"
													label="年龄">
									<Input type="text"
												 v-model="searchModel.Age"
												 placeholder="年龄"></Input>
								</FormItem>
							</div>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Address"
													label="地址">
									<Input type="text"
												 v-model="searchModel.Address"
												 placeholder="地址"></Input>
								</FormItem>
							</div>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Name"
													label="名称">
									<Input type="text"
												 v-model="searchModel.Name"
												 placeholder="名称"></Input>
								</FormItem>
							</div>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Age"
													label="年龄">
									<Input type="text"
												 v-model="searchModel.Age"
												 placeholder="年龄"></Input>
								</FormItem>
							</div>
							<div class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<FormItem prop="Address"
													label="地址">
									<Input type="text"
												 v-model="searchModel.Address"
												 placeholder="地址"></Input>
								</FormItem>
							</div>
							<div class="ivu-text-right ivu-col ivu-col-span-xs-24 ivu-col-span-sm-24 ivu-col-span-md-12 ivu-col-span-lg-8 ivu-col-span-xl-8">
								<Button icon="android-search"
												type="primary"
												@click="handleSearch()">查询</Button>
								<Button icon="android-search"
												type="primary"
												@click="handleSearch()">重置</Button>
							</div>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
	</div>
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
	            searchRules: {
	                Name: {
	                    required: true,
	                    message: '姓名为搜索必填项',
	                    trigger: 'blur'
	                }
	            }
	        };
	    },
	    methods: {
	        handleSearch () {
	            this.$emit('searchList', this.searchModel);
	        }
	    }
	};
</script>
