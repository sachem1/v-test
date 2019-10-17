<template>
  <div class="form-multab-wrapper">
    <Card>
      <div class="form-multab-wrapper-header-button">
        <Button type="primary" icon="md-add">新增</Button>
        <Button type="info" icon="md-print">打印</Button>
        <Button type="info" icon="md-cloud-upload">打印</Button>
      </div>
    </Card>
    <Card>
      <div class="form-multab-wrapper-content">
        <Tabs @on-click="HandleDetailInit" type="card" ref="currentTab" :animated="false">
          <TabPane label="表头" name="header" icon="md-document">
            <Row type="flex" justify="center">
              <Col span="24">
                <div class="form-content">
                  <Form
                    :model="formMainData"
                    label-position="left"
                    :label-width="120"	
                    :rules="rules"
                  >
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="企业内部编号" label-position="top" prop="CopErpNo">
                          <Input v-model="formMainData.CopErpNo" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="编号类型" label-position="top" prop="CopType">
                         
						  	 <Select v-model="formMainData.CopType"
							filterable>
							<Option> </Option>
				<Option v-for="item in CodeList"
								:value="item.code"
								:key="item.code">{{ item.codeName_CN }}</Option>
		         	</Select>
                        </FormItem>
                      </Col>
                  
                    </Row>
                    <Row>
					  <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="海关编号" label-position="top" prop="CopEmsNo">
                          <Input v-model="formMainData.CopEmsNo"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="对应档案库内部编号"  label-position="top" prop="EmsNo">
                        
  
						  	 <Select v-model="formMainData.EmsNo"
							filterable>
							<Option> </Option>
				             <Option v-for="item in CopErpNoList"
								:value="item.cop_Erp_No"
								:key="item.cop_Erp_No">{{ item.cop_Erp_No }}</Option>
		         	        </Select>

                        </FormItem>
                      </Col>
                   
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                       <FormItem label="申报日期" label-position="top" prop="DeclareDate">
                          <DatePicker
                            size="small"
                            :value="formMainData.DeclareDate"
                            transfer
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder
                          ></DatePicker>
						   </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="结束有效期" label-position="top" prop="EndDate">
                          <DatePicker
                            size="small"
                            :value="formMainData.EndDate"
                            transfer
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder
                          ></DatePicker>
                        </FormItem>
                      </Col>

                      
                    </Row>
                    <Row>
					  <Col :sm="24" :md="12" :lg="8">
                       <FormItem label="创建时间" label-position="top" prop="CreateTime">
                          <DatePicker
                            size="small"
                            :value="formMainData.CreateTime"
                            transfer
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder
                          ></DatePicker>
						   </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="创建用户" label-position="top" prop="CreateBy" >
                          <Input v-model="formMainData.CreateBy"></Input>
                        </FormItem>
                      </Col>
                     </Row>
					  <Row>
				
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="经营单位代码" label-position="top" prop="CustomerCode" >
                          <Input v-model="formMainData.CustomerCode"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="经营单位名称" label-position="top"  prop="CustomerName">
                          <Input v-model="formMainData.CustomerName"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <Col span="24">
                <div class="form-button">
                  <Button type="primary" @click="handleMainSubmit">保存</Button>
                </div>
              </Col>
            </Row>
          </TabPane>
        
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import Vue from "vue";
import generalButton from "_com/general-button";
export default {
  name: "nameTab",
  components: {
    generalButton
  },
  data() {
    return {
      formMainData: {
		CopErpNo:"",
		CopType:"", 
		CopEmsNo:"",
		EmsNo:"",
		DeclareDate:"",
			EndDate :"",
			CreateTime:"",
			CreateBy :"",
			CustomerCode:"",
			CustomerName:"",
        Id: ""
	  },
	  FileLibraryNoData:{
		rowNumber:"",
		id:"",
		cop_Erp_No:"",
		cop_Ems_No:"",
		declare_Date:"",
		end_Date:"",
		create_Time:"",
		is_Effective:"",
		customer_Code:""
		,cop_type:"",
		oftype:"",
		create_By:"",
		ems_no:""
		,customer_Name:"",
		cop_type_text:"",
		is_effective_text:""

	  },
	  CopErpNoList:[],
	  CodeList: [ ],
      rules: {
        CopErpNo: {
          required: true,
          message: "企业内部编号必填",
          trigger: "blur"
		},
		 CopType: {
          required: true,
          message: "编号类型必填",
          trigger: "blur"
        }
      }
  }
  },
  created () {
	       
			 this.getCodeList();
			 this.getCopErpNoList();
	    },
  methods: {
	  getCopErpNoList(){
               debugger;
				var customer = this.$store.state.login.userinfo.OrganizationCode
		        this.$store.dispatch({
					type: 'FileLibraryNo/GetFileLibDropdownList',
				     data:{ CustomerCodew: customer }
	            }).then(res => {
					debugger;
	                this.CopErpNoList = res.data.result;
	            });
	  },
	  getCodeList () {
	            this.$store.dispatch({
	                type: 'FileLibraryNo/getCodeList'
	            }).then(res => {
					debugger;
	                this.CodeList = res.data.result;
	            });
			}
			},
    HandleDetailInit(name) {
      if (name === "body") {
        this.handleDetailTable();
      }
    },
          
    handleMainSubmit() {
      this.$store
        .dispatch({
          type: "user/createUser",
          data: this.formMainData,
          serviceName: ""
        })
        .then(res => {
          this.$Message.success("保存成功");
        })
        .catch(error => {
          this.$Message.success("保存失败");
        });
    },
  mounted() {
	if (this.$route.query.FileLibraryNo)
	debugger;
      this.FileLibraryNoData= JSON.parse(this.$route.query.FileLibraryNo);
	   this.formMainData.Id=this.FileLibraryNoData.id;
	 
		this.formMainData.CopErpNo=this.FileLibraryNoData.cop_Erp_No;
		this.formMainData.CopEmsNo=this.FileLibraryNoData.cop_Ems_No;
		this.formMainData.DeclareDate=this.FileLibraryNoData.declare_Date;
		this.formMainData.EndDate=this.FileLibraryNoData.end_Date;
		this.formMainData.CreateTime=this.FileLibraryNoData.create_Time;
		//this.formMainData.is=this.FileLibraryNoData.is_Effective;
		this.formMainData.CustomerCode=this.FileLibraryNoData.customer_Code;
	debugger;
		this.formMainData.CopType= this.FileLibraryNoData.cop_type+"";
		this.formMainData.CreateBy=this.FileLibraryNoData.create_By;
		this.formMainData.EmsNo=this.FileLibraryNoData.ems_no;
		this.formMainData.CustomerName=this.FileLibraryNoData.customer_Name;
		// this.formMainData.Id=this.FileLibraryNoData.cop_type_text;
		// this.formMainData.Id=this.FileLibraryNoData.is_effective_text;
  }
};
</script>
<style scope lang="less">
.test {
  background: #333333;
}
</style>