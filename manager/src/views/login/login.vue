<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in"
						title="欢迎登录"
						:bordered="false">
				<div class="form-con">
					<Form ref="defaultModel"
								:model="defaultModel"
								:rules="rules">
						<Row>
							<i-col>
								<FormItem prop="loginName"
													label="登录名">
									<Input type="text"
												 @on-blur="loadChildrenSystem"
												 v-model="defaultModel.loginName"
												 placeholder="请输入登录名"></Input>
								</FormItem>
							</i-col>
						</Row>
						<Row>
							<i-col>
								<FormItem prop="password"
													label="密码">
									<Input type="password"
												 v-model="defaultModel.password"
												 placeholder="请输入密码"></Input>
								</FormItem>
							</i-col>
						</Row>
						<Row>
							<i-col>
								<FormItem prop="subId"
													label="系统">
									<Select v-model="defaultModel.subId"
													filterable
													remote
													:loading="rendering">
										<Option v-for="item in childrenSystemList"
														:value="item.value"
														:key="item.label">{{ item.label }}</Option>
									</Select>
								</FormItem>
							</i-col>
						</Row>
						<Row class="submit">
							<i-col>
								<Button type="primary"
												@click="handleLogin()">登录</Button>
							</i-col>
						</Row>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
	    name: 'login_page',
	    data () {
	        return {
	            defaultModel: {
	                loginName: '',
	                password: '',
	                subId: ''
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
	            rendering: false,
	            childrenSystemList: []
	        };
	    },
	    methods: {
	        handleLogin () {
	            let data = this.defaultModel;
	            this.$store
	                .dispatch({
	                    type: 'login/handleLogin',
	                    data
	                })
	                .then(res => {
	                    if (res.Token) {
	                        this.$router.push({
	                            name: 'home_index'
	                        });
	                    }
	                });
	        },
	        loadChildrenSystem () {
	            let loginName = this.defaultModel.loginName;
	            if (loginName !== '') {
	                this.loading1 = true;
	                this.$store
	                    .dispatch({
	                        type: 'login/getChildrenSystem',
	                        loginName: loginName
	                    })
	                    .then(res => {
	                        this.childrenSystemList = [];
	                        var data = res.data;
	                        for (let i = 0; i < data.length; i++) {
	                            this.childrenSystemList.push({
	                                label: data[i].label,
	                                value: data[i].value
	                            });
	                            this.defaultModel.subId = this.childrenSystemList[0].value;
	                        }
	                        this.loading1 = false;
	                    }, 800);
	            } else {
	                this.childrenSystemList = [];
	            }
	        }
	    }
	};
</script>

<style lang='less'>
@import "./login.less";
</style>