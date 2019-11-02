<template>
  <div>
    <div class="search-header">
      <Row>
        <Col span="12">
        <span class="title">查询</span>
        </Col>
        <Col span="12">
        <span
          @click="handleClick()"
          class="search-title-ico"
        >
          <Icon
            class="icon"
            :type="iconClass"
          ></Icon>
        </span>
        </Col>
      </Row>
    </div>
    <div class="search-content">
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
              :sm="24"
              :md="12"
              :lg="8"
            >
              <FormItem
                prop="emsNo"
                label="账册编号"
              >

                <basicinfo-select
                  v-model="searchModel.emsNo"
                  :url="selectUrl"
                  :parentValue="parentValue"
                  @onchange="emsNoChange"
                ></basicinfo-select>

              </FormItem>
            </i-col>
            <i-col
              :sm="24"
              :md="12"
              :lg="8"
            >
              <FormItem
                prop="exgNo"
                label="成品货号"
              >
                <Input
                  type="text"
                  v-model="searchModel.exgNo"
                  placeholder="成品货号"
                ></Input>
              </FormItem>
            </i-col>
            <i-col
              v-show="display"
              :sm="24"
              :md="12"
              :lg="8"
            >
              <FormItem
                prop="beginDate"
                label="单耗版本"
              >
                <Input
                  type="text"
                  v-model="searchModel.beginDate"
                  placeholder="单耗版本"
                ></Input>
              </FormItem>

            </i-col>

            <i-col
              v-show="display"
              :sm="24"
              :md="12"
              :lg="8"
            >
              <FormItem
                prop="imgNo"
                label="料件货号"
              >
                <Input
                  type="text"
                  v-model="searchModel.imgNo"
                  placeholder="料件货号"
                ></Input>
              </FormItem>

            </i-col>

            <i-col
              v-show="display"
              :sm="24"
              :md="12"
              :lg="8"
            >
              <FormItem
                prop="modifyMark"
                label="修改标记"
              >
                 <basicinfo2-select
                  v-model="searchModel.modifyMark"
                  :url="selectUrlModifyMark"
                  :parentValue="parentValueModifyMark"
                ></basicinfo2-select>
              </FormItem>
            </i-col>
         

            <i-col
              class="ivu-text-right"
              style="padding-left: 12px; padding-right: 12px;"
              :sm="{ span: 24, offset: 1 }"
              :md="{ span: 12, offset: 2 }"
              :lg="{ span: 8, offset: display?0:0 }"
            >
              <FormItem class="searchButton">
                <Button
                  icon="md-search"
                  type="primary"
                  @click="handleSearch()"
                >查询</Button>
                <Button
                  class="btn-default"
                  icon="md-redo"
                  @click="handleReset()"
                >重置</Button>
              </FormItem>

            </i-col>
          </Row>
        </Form>
      </Card>
    </div>

  </div>
</template>

<script>
import basicinfoSelect from "_com/custom-select";
import basicinfo2Select from "_com/custom-select/basic-info-select";
export default {
  name: "orgBomHistorySearch",
  components: {
    basicinfoSelect,
    basicinfo2Select
  },
  data() {
    return {
      displayAccordion: "",
      searchModel: {
        emsNo: "",
        exgNo: "",
        beginDate: "",
        modifyMark: "",
        imgNo: ""
      },
      display: false,
      displayName: "展开",
      emsNoList: [],
      iconClass: "md-arrow-dropdown",
      parentValue: "",
      selectUrl: "emsrecordinfo/emsnoselect",
      selectUrlModifyMark:"",
      parentValueModifyMark:"ModifyMark"
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchList", this.searchModel);
    },
    handleReset() {
      this.searchModel = {};
    },
    handleClick() {
      if (this.display) {
        this.displayName = "展开";
        this.display = false;
        this.iconClass = "md-arrow-dropdown";
      } else {
        this.display = true;
        this.displayName = "收起";
        this.iconClass = "md-arrow-dropup";
      }
    },
    emsNoChange(v) {
     
    }
  },
  created() {}
};
</script>
