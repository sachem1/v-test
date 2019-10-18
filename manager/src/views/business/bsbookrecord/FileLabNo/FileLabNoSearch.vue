<template>
	<div>
		<div class="title">
			<Row>
				<Col span="12">
				<span style="margin-left: 16px;display:block;font-weight:600">查询</span>
				</Col>
				<Col span="12">
				<span @click="handleClick()"
							class="search-title-ico">
					<Icon style="font-size:24px;font-weight:600;"
								type='md-arrow-dropdown'></Icon>
				</span>
				</Col>
			</Row>
		</div>
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
						<FormItem prop="CopEmsNo"
											label="海关编号">
							<Input type="text"
										 v-model="searchModel.CopEmsNo"
										 placeholder="海关编号"></Input>
						</FormItem>
					</i-col>
					<i-col :sm="24"
								 :md="12"
								 :lg="8">
						<FormItem prop="CopErpNo"
											label="企业内部编号">
							<Input type="text"
										 v-model="searchModel.CopErpNo"
										 placeholder="企业内部编号"></Input>
						</FormItem>
					</i-col>
					<i-col v-show="display"
								 :sm="24"
								 :md="12"
								 :lg="8">
						<FormItem prop="CopType"
											label="编号类型">
							
										 <Select v-model="searchModel.CopType"
							filterable>
						<Option 	value="" key=""></Option>
				<Option v-for="item in CodeList"
								:value="item.code"
								:key="item.code">{{ item.codeName_CN }}</Option>
		         	</Select>
						</FormItem>
					</i-col>
					<i-col v-show="display"
								 :sm="24"
								 :md="12"
								 :lg="8">
						<FormItem prop="DeclareDate"
											label="有效期">
							<Input type="text"
										 v-model="searchModel.DeclareDate"
										 placeholder="有效期"></Input>
						</FormItem>
					</i-col>
						<i-col v-show="display"
								 :sm="24"
								 :md="12"
								 :lg="8">
								 	<FormItem prop="IsEffect"
											label="">
						<Checkbox v-model="searchModel.IsEffect">隐藏失效</Checkbox>
							</FormItem>
					</i-col>
					<i-col class="ivu-text-right"
								 style="padding-left: 12px; padding-right: 12px;"
								 :sm="{ span: 24, offset: 1 }"
								 :md="{ span: 12, offset: 2 }"
								 :lg="{ span: 8, offset: display?16:0 }">
						<FormItem class="searchButton">
							<Button icon="md-search"
											type="primary"
											@click="handleSearch()">查询</Button>
							<Button class="ivu-ml-8"
											icon="md-redo"
											@click="handleReset()">重置</Button>
						</FormItem>
					</i-col>
				</Row>
			</Form>
		</Card>
	</div>
</template>

<script>
	export default {
	    name: 'search-page',
	    data () {
	        return {
				displayAccordion: '',
				CodeList: [ ],
	            searchModel: {
	                CopEmsNo: '',
	                CopErpNo: '',
                    CopType: 0,
					DeclareDate: '',
					IsEffect: false
	            },
	            display: false,
	            displayName: '展开',
	            IconClass: 'md-arrow-dropdown'

	        };
		}, rules: {


		},
		  created () {
	       
			 this.getCodeList();
	    },
	    methods: {
	        handleSearch () {
	            this.$emit('searchList', this.searchModel);
			},
			 getCodeList () {
	            this.$store.dispatch({
	                type: 'FileLibraryNo/getCodeList'
	            }).then(res => {
					
	                this.CodeList = res;
	            });
	        },
	        handleClick () {
	            if (this.display) {
	                this.displayName = '展开';
	                this.display = false;
	                this.IconClass = 'md-arrow-dropup';
	            } else {
	                this.display = true;
	                this.displayName = '收起';
	                this.IconClass = 'md-arrow-dropdown';
	            }
            },
            handleReset(){

                this.searchModel=null;
            }

	    }
	};
</script>
