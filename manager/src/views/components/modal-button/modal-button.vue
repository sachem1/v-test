<template>
  <div>
    <Button v-if="displayAdd" type="primary" icon="ios-add-circle-outline" @click="handleAdd">新增</Button>
    <Button v-if="displayDel" type="error" icon="ios-trash-outline" @click="handleDelete">删除</Button>
    <Button v-if="displaySave" type="info" icon="ios-cloud-done-outline" @click="handleSubmit">保存</Button>
    <Button
      v-if="displayCancel"
      style="margin-right: 8px"
      icon="ios-close-circle-outline"
      @click="handleCancel"
    >取消</Button>
    <Button v-if="displayPrev" :disabled="disablePrev" icon="ios-arrow-dropleft" type="primary" @click="handlePrev">上一条</Button>
    <Button v-if="displayNext" :disabled="disableNext" icon="ios-arrow-dropright" type="primary" @click="handleNext">下一条</Button>
  </div>
</template>

<script>
export default {
  name: "modal_button",
  props: {
    displayAdd: { type: Boolean, default: true },
    displayDel: { type: Boolean, default: true },
    displaySave: { type: Boolean, default: true },
    displayCancel: { type: Boolean, default: true },
    displayPrev: { type: Boolean, default: true },
    displayNext: { type: Boolean, default: true }
  },
  data() {
    return {
      disablePrev:false,
      disableNext:false,
    };
  },

  methods: {
    handleAdd() {
      this.$parent.$parent.prepareAdd();
    },
    handleDelete() {
      this.$parent.$parent.prepareDel();
    },
    handleSubmit() {
      this.$parent.$parent.prepareSubmit();
    },
    handleCancel() {
      this.$parent.$parent.prepareCancel();
    },
    handlePrev() {
      this.$parent.$parent.preparePrev();
    },
    handleNext() {
      this.$parent.$parent.prepareNext();
    }
  },
  watch:{
    
  }
};
</script>

<style>
</style>