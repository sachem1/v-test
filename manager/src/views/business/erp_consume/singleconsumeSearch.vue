<template>
  <div>
    <div class="title">
     
       <Row>
        <Col span="12">
        <span style="margin-left: 16px;display:block;font-weight:600">查询</span>
        </Col>
        <Col span="12">
        <span
          @click="handleClick()"
          class="search-title-ico"
        >
          <Icon
            style="font-size:24px;font-weight:600;"
            type='md-arrow-dropdown'
          ></Icon>
        </span>
        </Col>
      </Row> 
    </div>

      <card>
        <Form
        ref="searchModel"
        :label-width="100"
        :model="searchModel"
        inline
      >
        <Row
          type="flex"
          style="margin-left: -12px; margin-right: -12px;"
        >
        <i-col v-show="display" :sm="24" :md="12" :lg="8">
        <formItem prop="EmsNo" label="账册编号">
                                            <Select v-model="searchModel.EmsNo"
							filterable> 
                            <Option value="" key="">全部</Option>
				<Option v-for="item in emsNoList" :value="item" :key="item">{{
                                    item }}
								</Option>
			</Select>
                                        </formItem>
                                    </i-col>
                                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ProductId" label="生产订单号">
                                          <input type="text" v-model="searchModel.ProductId" placeholder="生产订单号">
                                        </FormItem>
                                    </i-col>
                                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="Input_DateBegin" label="创建时间">
                                            <input type="date" v-model="searchModel.Input_DateBegin" placeholder="">~
                                                 <input type="date" v-model="searchModel.Input_DateEnd" placeholder="">
                                        </FormItem>
                                            
                                    </i-col>
                            
                                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ErpNo" label="企业版本号">
                                            <input type="text" v-model="searchModel.ErpNo" placeholder="企业版本号">
                                        </FormItem>
                                    </i-col>
                                   <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="BeginDate" label="单耗版本号">
                                            <input type="text" v-model="searchModel.BeginDate" placeholder="单耗版本号">
                                        </FormItem>
                                    </i-col>
                                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ExgNo" label="成品货号">
                                            <input type="text" v-model="searchModel.ExgNo" placeholder="成品货号">
                                        </FormItem>
                                    </i-col>
                              
                                        <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ExgGNo" label="成品序号">
                                            <input type="number" v-model="searchModel.ExgGNo" placeholder="成品序号">
                                        </FormItem>
                                    </i-col> 
                                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ImgNo" label="料件货号">
                                            <input type="text" v-model="searchModel.ImgNo" placeholder="料件货号">
                                        </FormItem>
                                    </i-col> 
                                     <i-col v-show="display" :sm="24" :md="12" :lg="8">
                                        <FormItem prop="ImgGNo" label="料件序号">
                                            <input type="number" v-model="searchModel.ImgGNo" placeholder="料件序号">
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
											@click="handleSearch()">重置</Button>
						</FormItem>
					</i-col>
                                </row>
                            </form>
                        </card>
  </div>
</template>

<script>
// export default {
//   name: "search-page",
//   data() {
//     return {
//       displayAccordion: "",
//       searchModel: {
//         EmsNo: "",
//         Input_DateBegin: "",
//         Input_DateEnd: "",
//         ProductId:"",
//       },
//       display: false,
//       displayName: "展开",
//       IconClass: "md-arrow-dropdown",
//       emsNoList:[]
//     };
//   },
//   methods: {
//     handleSearch() {
//       this.$emit("searchList", this.searchModel);
//     },
//     handleClick() {
//       if (this.display) {
//         this.displayName = "展开";
//         this.display = false;
//         this.IconClass = "md-arrow-dropup";
//       } else {
//         this.display = true;
//         this.displayName = "收起";
//         this.IconClass = "md-arrow-dropdown";
//       }
//     },
// 	        getEmsNoList () {
// 	            this.$store.dispatch({
//                     type: 'goodsErp/getEmsNoList',
//                     data:{custromeCode:'PSXS'}
// 	            }).then(res => {
// 	                this.emsNoList = res.data;
// 	            });
// 	        }
//   },
//   created () {
//       this.getEmsNoList();

//   }
// };
</script>
