<template>
	<div class="">
		<div class="searchForm">
			  <Card>       
			<!-- search -->
		 <Form ref="searchForm" :label-width='150' :model="searchForm" :rules="ruleInline" inline>
			 <Row>
				 <i-col span='8'>
        <FormItem prop="name" label="名称">
            <Input type="text" v-model="searchForm.name" placeholder="名称"></Input>
        </FormItem>
				</i-col>	 
				<i-col span='8'>
        <FormItem prop="age"  label="年龄">
            <Input type="text" v-model="searchForm.age" placeholder="年龄">
            </Input>
        </FormItem>
					</i-col>	 
					<i-col span='8'>
				     <FormItem prop="address"   label="地址">
            <Input type="text" v-model="searchForm.address" placeholder="地址">
            </Input>
        </FormItem>	</i-col>	
				</Row>
				<Row class="search">
					<i-col >
								<Button type="primary" @click="handleSearch('searchForm')">查询</Button>
					</i-col>
				</Row>
    </Form>
		  </Card>
		</div>
		<!--pagetable-->
		<div>
				 <!-- <Table class="small-table" size="small" border :columns="gridColumns" :data="gridData" :disabled-hover="true" ></Table> -->

				 	<paged-table ref="testTable"
									 :enums="commonEnums"
									 :serviceName="serviceName"
									 :listUrl="listUrl"
									 :searchModel="searchModel"
									 :searchItems="searchItems"
									 :columns="columns"
									 :pageSize="pageSize"
									 :bus="bus"
									 :title="tableTitle"
									 :disableImportExport="disableImportExport"
									 :disableAdd="disableAdd"
									 :disableBatchDelete="disableBatchDelete"
									 :addBehaviorSetting="addBehaviorSetting"
									 :thisTableData=gridData
									 @on-request-inline-page="handleInlinePageRequest"></paged-table>
		</div>
	</div>

</template>
<script>
	import Vue from 'vue';
	import axios from 'axios';
	import pagedTable from './../my-components/paged-table.vue';
	Vue.component('paged-table', pagedTable);

	export default {
	    name: 'trade',
	    data () {
	        return {
	            searchForm: {
                name: '',
                password: ''
            },
            gridColumns: [
                {title: '姓名', key: 'name', align: 'center'},
                {title: '年龄', key: 'age', align: 'center'},
                {title: '地址', key: 'address', align: 'center'},
                {title: '账号', key: 'userName', align: 'center'},
                {title: '密码', key: 'password', align: 'center'}
            ],
            gridData: [
                {
                    name: '31313',
                    address: '闵行101大道',
                    age: 30,
                    userName: '30',
                    password: '123'
                },
                {
                    name: '张三',
                    address: '闵行101大道',
                    age: 30,
                    userName: 'abdc',
                    password: '123'
                },
                {
                    name: '李四',
                    address: '闵行101大道',
                    age: 30,
                    userName: 'afdsbc',
	                    password: '123'
                },
                {
                    name: '王五',
                    address: '闵行101大道',
                    age: 30,
                    userName: 'aerebc',
                    password: '123'
                }
	            ],
            operationMode: null,
            entityName: '',
            serviceName: '',
            listUrl: null,
            columns: [],
            thisTableData: [],
            pageIndex: 1,
            recordCount: 0,
            searchModel: {},
            showModalForm: false,
            showChildModalForm: false,
            modal_loading: false,
            defaultModel: {},
            editingModel: {},
            validateRules: {},
            commonEnums: {},
            selectedRows: [],
            formItems: [],
            searchItems: [],
            bus: new Vue(),
            childFormTitle: ' ',
            addBehaviorSetting: {},
            tableTitle: null,
            disableImportExport: false,
            autoClose: true,
            disableAdd: false,
            disableBatchDelete: false
	        };
	    },
	    methods: {
        handleSearch (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            });
	        },
	        handleInlinePageRequest (payload) {
	            this.$emit('on-request-inline-page', payload);
	        }
	    }
	};
</script>
<style lang='less'>
.search{
	text-align: center;
	.btn{margin-left:0;}

}
</style>