<template>
	<div class="form-custom-wrapper">
		<Layout>
			<Header class="layout-header-bar">{{title}}用户</Header>
			<Content class="layout-content">
				<Card>
					<Row type="flex"
							 justify="center">
						<Col span="18">
						<div class="form-content">
							<Form :model="userForm"
										label-position="left"
										:label-width="100">
								<Row :gutter="32">
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="name"
														label-position="top">
										<Input v-model="userForm.name"
													 placeholder />
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="age"
														label-position="top">
										<Input v-model="userForm.age"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="address"
														label-position="top">
										<Input type="text"
													 v-model="userForm.address"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="loginName"
														label-position="top">
										<Input v-model="userForm.loginName"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="password"
														label-position="top">
										<Input v-model="userForm.password"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="address"
														label-position="top">
										<Input type="textarea"
													 v-model="userForm.address"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="loginName"
														label-position="top">
										<Input v-model="userForm.loginName"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<FormItem label="password"
														label-position="top">
										<Input v-model="userForm.password"></Input>
									</FormItem>
									</Col>
									<Col :sm="24"
											 :md="12"
											 :lg="8">
									<Button @click="alertDetail">查看</Button>
									</Col>
								</Row>
							</Form>
						</div>

						</Col>
					</Row>
					<Row>
						<Col span="24">
						<div class="form-button">
							<Button type="primary"
											@click="handleSubmit">保存</Button>
							<Button style="margin-right: 8px"
											@click="closePanel()">取消</Button>
						</div>
						</Col>
					</Row>
				</Card>
			</Content>
		</Layout>
	</div>
</template>


<script>
	export default {
	    name: 'UserForm',
	    props: {
	        name: {
	            type: String,
	            default: ''
	        },
	        age: {
	            type: Number,
	            default: 0
	        },
	        address: {
	            type: String,
	            default: ''
	        },
	        loginName: {
	            type: String,
	            default: ''
	        },
	        password: {
	            type: String,
	            default: ''
	        },
	        visible: Boolean,
	        operationMode: String,
	        autoClose: {
	            type: Boolean,
	            default: false
	        }
	    },
	    computed: {
	        visibleForBind: function () {
	            return this.visible;
	        }
	    },
	    data () {
	        return {
	            userForm: {
	                name: '',
	                address: '',
	                age: 0,
	                loginName: '',
	                password: ''
	            },
	            rules: {
	                loginName: {
	                    required: true,
	                    message: '登录名称不能为空',
	                    trigger: 'blur'
	                },
	                password: {
	                    required: true,
	                    message: '密码不能为空',
	                    trigger: 'blur'
	                }
	            },
	            styles: {
	                overflow: 'auto',
	                paddingBottom: '53px',
	                position: 'static'
	            },
	            showModalFormBind: false,
	            showSecondLayer: false,
	            detailColumn: [
	                { type: 'selection', width: 60, align: 'center' },
	                { title: '姓名', width: 200, key: 'name', align: 'center' },
	                { title: '年龄', width: 100, key: 'age', align: 'center' },
	                { title: '地址', key: 'address', align: 'center' }
	            ],
	            detailData: [
	                {
	                    name: '33',
	                    age: '44',
	                    address: '55'
	                },
	                {
	                    name: '33',
	                    age: '44',
	                    address: '55'
	                }
	            ],
	            selectedRows: [],
	            title: ''
	        };
	    },
	    methods: {
	        closePanel () {
	            console.log('modal close');
	            this.showModalFormBind = false;
	            this.$emit('on-visible-change', false);
	            this.$emit('on-model-change', this.userForm);
	        },
	        visibleChange (value) {
	            if (!value) {
	                this.$emit('on-visible-change', value);
	            }
	        },
	        handleSubmit () {
	            let vm = this;
	            let type =
					vm.operationMode === 'create' ? 'user/createUser' : 'user/updateUser';
	            console.log(vm.operationMode);
	            var tips = '添加';
	            if (vm.operationMode === 'edit') tips = '更新';
	            vm.$store
	                .dispatch({
	                    type: type,
	                    data: vm.userForm,
	                    serviceName: ''
	                })
	                .then(res => {
	                    if (vm.autoClose) vm.closePanel();
	                    vm.$Message.success(tips + '成功!');
	                })
	                .catch(error => {
	                    console.log(error);
	                    vm.$Message.error(tips + '失败!');
	                });
	        },
	        alertDetail () {
	            this.showSecondLayer = true;
	        },
	        selectionChanged (selection) {
	            this.selectedRows = selection;
	        },
	        getsata111 () {
	            console.log('dfdsf');
	            var rowData = this.selectedRows[0];
	            this.userForm.password = rowData.name;
	        }
	    },
	    mounted () {
	        this.title = this.operationMode === 'create' ? '新增' : '修改';
	        console.log('userForm:' + JSON.stringify(this.userForm));
	        if (!this.userForm) {
	            this.userForm = JSON.parse(this.$route.query.userForm);
	        }
	    }
	};
</script>
