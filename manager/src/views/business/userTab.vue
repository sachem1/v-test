<template>
	<Tabs type="card" :animated="false">
		<TabPane label="表头">
			<Form ref="formMainData"
						:model="formMainData"
						:rules="validateRule"
						label-position="left"
						:label-width="100">
				<Row :gutter="16">
					<Col span="12">
					<i-col>
						<FormItem prop="LoginName"
											label="登录账号长度">
							<Input type="text"
										 v-model="formMainData.LoginName"
										 clearable
										 style="background:red"></Input>
						</FormItem>
					</i-col>
					</Col>
					<Col span="12">
					<FormItem label="Password"
										label-position="top">
						<Input v-model="formMainData.Password"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="16">
					<Col span="8">
					<FormItem prop="LoginName"
										label="LoginName"
										label-position="top">
						<Input v-model="formMainData.LoginName"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="Password"
										label-position="top">
						<Input v-model="formMainData.Password"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem prop="LoginName"
										label="LoginName"
										label-position="top">

					</FormItem>
					</Col>
				</Row>
				<Row :gutter="16">
					<Col span="6">
					<FormItem label="Name"
										label-position="top">
						<Input v-model="formMainData.Name"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="Age"
										label-position="top">
						<Input v-model="formMainData.Age"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="Address"
										label-position="top">
						<Input v-model="formMainData.Address"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="Remark"
										label-position="top">
						<Input v-model="formMainData.Remark"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Button type="primary"
									@click="handleMainSubmit">保存</Button>
				</Row>
			</Form>
		</TabPane>
		<TabPane label="表体">
			<Row>
				<Card>
					<Button type="primary"
									@click="clickTest">打印</Button>
					<Button type="primary"
									@click="clickTest">导入</Button>
					<Button type="primary"
									@click="clickTest">下载</Button>
				</Card>
			</Row>
			<Row>
				<Card>
					<Form ref="formDetailData"
								:model="formDetailData"
								label-position="left"
								:label-width="100">
						<Row :gutter="16">
							<Col span="8">
							<FormItem label="Name"
												label-position="top">
								<Input v-model="formDetailData.Name"
											 placeholder />
							</FormItem>
							</Col>
							<Col span="8">
							<FormItem label="Age"
												label-position="top">
								<Input v-model="formDetailData.Age"></Input>
							</FormItem>
							</Col>
							<Col span="8">
							<FormItem label="Address"
												label-position="top">
								<Input type="textarea"
											 v-model="formDetailData.Address"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Button type="primary"
											@click="handleDetailSubmit">保存</Button>
						</Row>
					</Form>
				</Card>
			</Row>
			<Row>
				<Card>
					<Table :columns="columns1"
								 :data="tableData"></Table>
				</Card>
				</Card>
			</Row>
		</TabPane>
		<TabPane label="what">空空如也</TabPane>
	</Tabs>
</template>
<script>
	import pagedTable from '@/views/components/paged-table';

	export default {
	    name: 'nameTab',
	    data () {
	        return {
	            formMainData: {
	                LoginName: '',
	                Password: '',
	                Name: '',
	                Age: '',
	                Address: '',
	                Remark: ''
	            },
	            formDetailData: {
	                Name: '',
	                Age: '',
	                Address: ''
	            },
	            validateRule: {
	                LoginName: {
	                    required: true,
	                    message: '登录名称不能为空',
	                    trigger: 'blur'
	                }
	            },
	            mainServiceName: 'user/createUser',
	            detailServiceName: 'user/createUser',
	            columns1: [
	                { type: 'selection', width: 60, align: 'center' },
	                { title: '姓名1', width: 200, key: 'Name', align: 'center' },
	                { title: '年龄', width: 100, key: 'Age', align: 'center' },
	                { title: '地址', key: 'Address', align: 'center' }
	            ],
	            tableData: [
	                {
	                    Name: '33',
	                    Age: '44',
	                    Address: '55'
	                },
	                {
	                    Name: '33',
	                    Age: '44',
	                    Address: '55'
	                }
	            ]
	        };
	    },
	    methods: {
	        handleMainSubmit () {
	            this.$store
	                .dispatch({
	                    type: 'user/createUser',
	                    data: this.formMainData,
	                    serviceName: this.mainServiceName
	                })
	                .then(res => {
	                    this.$Message.success('success');
	                })
	                .catch(error => {
	                    this.$Message.success('fail');
	                });
	        },
	        handleDetailSubmit () {
	            this.$store
	                .dispatch({
	                    type: 'user/createUser',
	                    data: this.formDetailData,
	                    serviceName: this.detailServiceName
	                })
	                .then(res => {
	                    this.$Message.success('success');
	                })
	                .catch(error => {
	                    this.$Message.success('fail');
	                });
	        },
	        clickTest () {
	            this.$Message.success('点击成功fsdfdsfsdfdsfdswerewrewef');
	        }
	    }
	};
</script>
<style scope lang="less">
.test {
	background: #333333;
}
</style>