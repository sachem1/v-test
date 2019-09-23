<template>
	<div class="">
		<div class="searchForm">
			  <Card>
        <p slot="title">
						<i class="el-icon-search" />
            查询
        </p>
		 <Form ref="searchForm" :model="searchForm" :rules="ruleInline" inline>
			 <Row>
				 <col span='8'>
        <FormItem prop="name">
            <Input type="text" v-model="searchForm.name" placeholder="名称">
            </Input>
        </FormItem>
				</col>	 <col span='8'>
        <FormItem prop="age">
            <Input type="text" v-model="searchForm.age" placeholder="年龄">
            </Input>
        </FormItem>
					</col>	 <col span='8'>
				     <FormItem prop="address">
            <Input type="text" v-model="searchForm.address" placeholder="地址">
            </Input>
        </FormItem>	</col>	
				</Row>
        <FormItem class="search-btn">
            <Button type="primary" @click="handleSearch('searchForm')">查询</Button>
        </FormItem>
    </Form>
		  </Card>
		</div>
		<!--button-->
		<div>button</div>
		<!--pagetable-->
		<div>
				 <Table class="small-table" size="small" border :columns="vipProductColumns"         :data="data3" :disabled-hover="true" ></Table>
		</div>
	</div>

</template>
<script>
	export default {
	    name: 'trade',
	    data () {
	        return {
	            searchForm: {
                name: '',
                password: ''
            },
            vipProductColumns: [
                {title: '姓名', key: 'name', align: 'center'},
                {title: '年龄', key: 'age', align: 'center'},
                {title: '地址', key: 'address', align: 'center'},
                {title: '账号', key: 'userName', align: 'center'},
                {title: '密码', key: 'password', align: 'center'}
            ],
            data3: [
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
            ]
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
        }
	    }
	};
</script>

<style lang="less">

</style>