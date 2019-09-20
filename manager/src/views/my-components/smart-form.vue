<template>
    <div>
        <div v-if="!isInline">
            <Modal width="1000" :value="visibleForBind" :title="formTitle" @on-ok="save" class-name="vertical-center-modal"
                @on-visible-change="visibleChange">
                <div class="half-col" style="overflow: hidden;min-height: 160px;">
                    <Form ref="mainForm" :model="editingModel" :label-width="100" label-position="right" :rules="validateRules">
                        <smart-item v-for="item in formItemsComputed" :key="item.prop" :data="item" :model="editingModel"
                            :enums="enums"></smart-item>
                    </Form>
                </div>
                <div slot="footer">
                    <div style="text-align: center;">
                        <i-button type="primary" @click="save()" icon="checkmark">保存</i-button>
                        <i-button icon="close" @click="closePanel()" style="margin-left: 60px;">关闭</i-button>
                    </div>
                </div>
            </Modal>
        </div>
        <div v-if="isInline">
            <Row style="padding: 10px 0">
                <Button type="primary" icon="android-save" @click="save">保存</Button>
            </Row>
            <Row>
                <Card>
                    <div class="half-col" style="overflow: hidden;min-height: 160px;">
                        <Form ref="mainForm" :model="editingModel" :label-width="100" label-position="right" :rules="validateRules">
                            <smart-item v-for="item in formItemsComputed" :key="item.prop" :data="item" :model="editingModel"
                                :enums="enums"></smart-item>
                        </Form>
                    </div>
                </Card>
            </Row>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import smartItem from './../my-components/smart-item.vue';

    Vue.component('smart-item', smartItem);
    export default {
        name: 'smartForm',
        props: {
            visible: Boolean,
            serviceName: String,
            value: {
                default: function () {
                    return {};
                }
            },
            defaultModel: Object,
            formItems: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            enums: Object,
            validateRules: Object,
            operationMode: {
                default: function () {
                    return '';
                }
            },
            entityName: {
                default: function () {
                    return '';
                }
            },
            isInline: {
                default: function () {
                    return false;
                }
            },
            autoClose: {
                default: function () {
                    return true;
                }
            }
        },
        methods: {
            init() {
                var vm = this;
                vm.formItems.forEach(item => {
                    if ((item.hide && vm.operationMode != 'edit') || item.type === 'readonly') {
                        var queryKey = item.syncFromRoute ? item.syncFromRoute : item.prop;
                        vm.editingModel[item.prop] = vm.$route.query[queryKey];
                    }
                });
            },
            async save() {
                var vm = this;
                await this.$refs['mainForm'].validate(async (valid) => {
                    if (valid) {
                        await vm.$store.dispatch({
                            serviceName: vm.serviceName,
                            type: 'service/' + (vm.operationMode == 'edit' ? 'update' :
                                'create'),
                            data: vm.editingModel
                        });

                        vm.$emit('on-model-change', vm.editingModel);
                        if (vm.autoClose && !vm.isInline)
                            vm.closePanel();
                        vm.$Message.success({
                            content: vm.operationText + '操作已成功！',
                            duration: 5
                        });
                    }
                    // if (valid) {
                    //     await vm.$store.dispatch({
                    //         serviceName: vm.serviceName,
                    //         type:'service/' + (vm.operationMode == 'edit' ? 'update' : 'create'),
                    //         data: vm.editingModel
                    //     });

                    //     vm.$emit('on-model-change', vm.editingModel);
                    //     vm.closePanel();
                    //     vm.$Message.success({content: vm.operationText + '操作已成功！', duration: 5});
                    // }   
                });
            },
            closePanel() {
                this.$emit('on-visible-change', false);
            },
            visibleChange(value) {
                if (!value) {
                    this.$emit('on-visible-change', value);
                }
            }
        },
        computed: {
            operationText: function () {
                if (this.operationMode == 'add')
                    return '添加';

                if (this.operationMode == 'edit')
                    return '编辑';

                return '未知';
            },
            formTitle: function () {
                return this.operationText + this.entityName;
            },
            editingModel: function () {
                return this.value;
            },
            formItemsComputed: function () {
                var result = [];
                this.formItems.forEach(item => {
                    if (item.hide)
                        return;

                    result.push(item);
                })

                return result;
            },
            visibleForBind: function () {
                return this.visible;
            }
        },
        watch: {
            value: function () {
                this.init();
            }
        }
    }
</script>