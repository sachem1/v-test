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
    <Card>
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
              <i-col
              :sm="24" :md="12" :lg="8"  
          >
            <FormItem
              prop="EmsNo"
              label="账册编号"
            >
              <!-- <Input
                type="text"
                v-model="searchModel.EmsNo"
                 placeholder="账册编号"
              ></Input> -->
            <Select v-model="searchModel.EmsNo"
							filterable> 
                            <Option value="" key="">全部</Option>
				<Option v-for="item in emsNoList"
								:value="item"
								:key="item">{{ item }}</Option>
			</Select>
             

            </FormItem>
          </i-col>
          <i-col
            :sm="24" :md="12" :lg="8"
          >
            <FormItem
              prop="ErpSku"
              label="企业料号"
            >
              <Input
               type="text"
                v-model="searchModel.ErpSku"
                placeholder="企业料号"
              ></Input>
            </FormItem>
          </i-col>
          <i-col
            :sm="24" :md="12" :lg="8"
          >
            <FormItem
              prop="ImgNo"
              label="备案料号"
            >
              <Input
                type="text"
                v-model="searchModel.ImgNo"
                placeholder="备案料号"
              ></Input>
            </FormItem>

          </i-col>

           <i-col
             :sm="24" :md="12" :lg="8"
          >
            <FormItem
              prop="GOODSFLAG"
              label="物料标志"
            >
              <!-- <Input
                type="text"
                v-model="searchModel.GOODSFLAG"
                placeholder="物料标志"
              ></Input> -->

               <Select v-model="searchModel.GOODSFLAG"
							filterable> 
                            <Option value="" key="">全部</Option>
				 <Option value="3" key="3">料件</Option>
                 <Option value="4" key="4">成品</Option>
			</Select>
            </FormItem>
          </i-col>
          <!-- <i-col
           :sm="24" :md="12" :lg="8"
          >
            <FormItem
              prop="OperateFlag"
              label="维护标志"
            >
              <Input
                type="text"
                v-model="searchModel.OperateFlag"
                 placeholder="维护标志"
              ></Input>
            </FormItem>
          </i-col> -->
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
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: "search-page",
  data() {
    return {
      displayAccordion: "",
      searchModel: {
        EmsNo: "",
        ErpSku: "",
        ImgNo: "",
        GOODSFLAG: "",
        // OperateFlag: ""
      },
      display: false,
      displayName: "展开",
      IconClass: "md-arrow-dropdown",
      emsNoList:[]
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchList", this.searchModel);
    },
    handleClick() {
      if (this.display) {
        this.displayName = "展开";
        this.display = false;
        this.IconClass = "md-arrow-dropup";
      } else {
        this.display = true;
        this.displayName = "收起";
        this.IconClass = "md-arrow-dropdown";
      }
    },
	        getEmsNoList () {
	            this.$store.dispatch({
                    type: 'goodsErp/getEmsNoList',
                    data:{custromeCode:'PSXS'}
	            }).then(res => {
	                this.emsNoList = res.data;
	            });
	        }
  },
  created () {
      this.getEmsNoList();

  }
};
</script>
