<template>
    <div>
        <div class="title">
            <Row>
                <Col span="12">
                    <span style="margin-left: 16px;display:block;font-weight:600">查询</span>
                </Col>
                <Col span="12">
                    <span @click="handleClick()" class="search-title-ico">
                        <Icon style="font-size:24px;font-weight:600;" type="md-arrow-dropdown"></Icon>
                    </span>
                </Col>
            </Row>
        </div>
        <Card>
            <Form ref="searchModel" :label-width="100" :model="searchModel" inline>
                <Row type="flex" style="margin-left: -12px; margin-right: -12px;">
                    <i-col :sm="24" :md="12" :lg="8">
                        <FormItem label="企业内部编号">
                            <Input type="text" v-model="searchModel.EmsId" placeholder="企业内部编号" />
                        </FormItem>
                    </i-col>
                    <i-col :sm="24" :md="12" :lg="8">
                        <FormItem label="预录入统一编号">
                            <Input
                                type="text"
                                v-model="searchModel.PreEmsNo"
                                placeholder="预录入统一编号"
                            />
                        </FormItem>
                    </i-col>
                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                        <FormItem label="创建时间">
                            <DatePicker
                                type="date"
                                v-model="searchModel.CreateTime_Begin"
                                placeholder="创建开始时间"
                            ></DatePicker>
                            <DatePicker
                                type="date"
                                v-model="searchModel.CreateTime_End"
                                placeholder="创建结束时间"
                            ></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                        <FormItem label="申请流水号">
                            <Input type="text" v-model="searchModel.EmsNo" placeholder="申请流水号" />
                        </FormItem>
                    </i-col>
                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                        <FormItem label="数据状态">
                            <Select v-model="searchModel.DeclareStatus"></Select>
                        </FormItem>
                    </i-col>
                    <i-col v-show="display" :sm="24" :md="12" :lg="8">
                        <FormItem label="档案库编号">
                            <Input type="text" v-model="searchModel.CopEmsNo" placeholder="档案库编号" />
                        </FormItem>
                    </i-col>
                    <i-col
                        class="ivu-text-right"
                        style="padding-left: 12px; padding-right: 12px;"
                        :sm="{ span: 24, offset: 1 }"
                        :md="{ span: 12, offset: 2 }"
                        :lg="{ span: 8, offset: display?16:0 }"
                    >
                        <FormItem class="searchButton">
                            <Button icon="md-search" type="primary" @click="handleSearch()">查询</Button>
                            <Button class="ivu-ml-8" icon="md-redo" @click="handleReset()">重置</Button>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    name: "it-record-Search",
    data() {
        return {
            displayAccordion: "",
            searchModel: {
                EmsId: "",
                PreEmsNo: "",
                CreateTime_Begin: "",
                CreateTime_End: "",
                DeclareStatus: "",
                EmsNo: "",
                CopEmsNo: ""
            },
            display: true,
            displayName: "展开",
            IconClass: "md-arrow-dropdown"
        };
    },
    created: function() {
        this.restModel = Object.assign({}, this.searchModel);
    },
    methods: {
        handleSearch() {
            this.$emit("searchList", this.searchModel);
        },
        handleReset() {
            this.searchModel = this.restModel;
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
        }
    }
};
</script>
