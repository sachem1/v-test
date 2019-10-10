<template>
  <div>
    <general-button
    :bus="bus"
    :displayAdd='displayAdd'
    :displayEdit='displayEdit'
    :displayBatchDelete='displayBatchDelete'
    :displayImportExport='displayImportExport'
    ></general-button>
  </div>
</template>

<script>
import Vue from "vue";
import generalButton from "_com/general-button";

export default {
  name: "ButtonPage",
  components: {
    generalButton
  },
  data() {
    return {
      bus: new Vue(),
      displayAdd: true,
      displayEdit: true,
      displayBatchDelete: true,
      displayImportExport: true,
      addBehaviorSetting: {
        routeName: "userTab",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      }
    };
  },
  created() {
    this.bus.$on("prepareAdd", this.add);
    this.bus.$on("prepareEdit", this.edit);
  },
  beforeDestroy() {
    this.bus.$off("prepareAdd", this.add);
    this.bus.$off("prepareEdit", this.edit);
  },
  methods: {
    add() {
      console.log("添加");
    },
    edit() {
      console.log("编辑");
    }
  }
};
</script>

<style>
</style>