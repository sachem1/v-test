<template>
  <div>
    <smart-form
      ref="mainForm"
      v-model="editingModel"
      :isInline="true"
      :validateRules="validateRules"
      :operationMode="operationMode"
      :entityName="entityName"
      :serviceName="serviceName"
      :enums="commonEnums"
      :formItems="formItems"
      @on-model-change="onMainFormSaved"
    ></smart-form>
  </div>
</template>
<script>
import Vue from "vue";
import validaterulebuilder from "./../my-components/validate-rule-builder.js";
import cascademediator from "./../my-components/cascade-mediator.js";
import smartForm from "./../my-components/smart-form.vue";

Vue.use(validaterulebuilder);
Vue.use(cascademediator);
Vue.component("smart-form", smartForm);

export default {
  name: "listPage",
  data() {
    return {
      operationMode: null,
      entityName: "",
      serviceName: "",
      defaultModel: {},
      editingModel: {},
      validateRules: {},
      commonEnums: {},
      formItems: [],
      bus: new Vue()
    };
  },
  created() {
    this.init();
  },
  beforeDestroy() {},
  methods: {
    async init() {
      var vm = this;
      this.operationMode = this.$route.name.startsWith("Add") ? "add" : "edit";
      var metadata = await vm.$store.dispatch({
        type: "service/getMetaData",
        data: {
          metaFileName: this.metaFileNameForBind,
          query: this.$route.query
        }
      });
      vm.buildUiConfig(vm, metadata);

      if (this.$route.query.id) {
        var buffer = await vm.$store.dispatch({
          serviceName: vm.serviceName,
          type: "service/get",
          data: this.$route.query.id
        });
        if (buffer) vm.editingModel = buffer;
        vm.$nextTick(() => {
          Vue.markAsInitialized(vm.editingModel);
        });
      }
    },
    buildUiConfig(vm, config) {
      vm.serviceName = config.serviceName;
      vm.entityName = config.entityName;
      if (config.hasOwnProperty("enums")) {
        config.enums.forEach(meta => {
          vm.commonEnums[meta.name] = meta.items;
        });
      }
      vm.defaultModel = config.defaultModel;
      vm.editingModel = JSON.parse(JSON.stringify(vm.defaultModel));
      vm.$nextTick(() => {
        Vue.markAsInitialized(vm.editingModel);
      });
      vm.validateRules = Vue.buildValidateRules(config.formItems);

      Vue.attachCascadeWatchers(vm, config.formItems, "editingModel");
      vm.formItems = config.formItems;
    },
    onMainFormSaved(newModel) {
      this.bus.$emit("on-data-changed");
    }
  },
  computed: {
    metaFileNameForBind: function() {
      //debugger;
      if (
        this.metaFileName == undefined ||
        this.metaFileName == null ||
        this.metaFileName == ""
      )
        return this.$route.name.replace("Add", "").replace("Edit", "");

      return this.metaFileName;
    }
  }
};
</script>