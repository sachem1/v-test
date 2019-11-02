<template>
    <div>
        <div class="search-header">
            <Row>
                <Col span="12">
                    <span class="title">查询</span>
                </Col>
                <Col span="12">
          <span @click="handleClick()" class="search-title-ico">
            <Icon class="icon" :type="iconClass"></Icon>
          </span>
                </Col>
            </Row>
        </div>
        <div class="search-content">
            <Card>
                <Form ref="searchModel" :label-width="100" :model="searchModel" inline>
                    <Row type="flex" style="margin-left: -12px; margin-right: -12px;">
                        <i-col :sm="24" :md="12" :lg="8">
                            <FormItem prop="CopEmsNo" label="字段值">
                                <Input type="text" v-model="searchModel.ControlName" placeholder="字段值"></Input>
                            </FormItem>
                        </i-col>
                        <i-col :sm="24" :md="12" :lg="8">

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
                                <Button icon="md-redo" class="btn-default" @click="handleReset">重置</Button>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'search-page',
        data() {
            return {
                displayAccordion: '',
                CodeList: [],
                searchModel: {
                    ControlName: ''
                },
                display: false,
                displayName: '展开',
                iconClass: "md-arrow-dropdown"
            };
        },
        mounted() {

        },
        created() {

        },
        methods: {
            handleSearch() {
                this.$emit('searchList', this.searchModel);
            },

            handleClick() {

            },
            handleReset() {
                this.searchModel = {};
            }

        }
    };
</script>
