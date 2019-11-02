<template>
  <div class="generalButton">
    <span v-if="displayAdd">
      <Button
        type="primary"
        icon="ios-add-circle-outline"
        :disabled="disableAdd"
        @click="handleAdd"
      >新增</Button>
    </span>
    <span v-if="displayDel">
      <Button type="error" icon="ios-trash-outline" :disabled="disableDel" @click="handleDelete">删除</Button>
    </span>
    <span v-if="displaySave">
      <Button
        type="info"
        icon="ios-cloud-done-outline"
        :disabled="disableSave"
        @click="handleSubmit"
      >保存</Button>
    </span>
    <span v-if="displayCancel">
      <Button class="btnCancel" icon="ios-close-circle-outline" @click="handleCancel">取消</Button>
    </span>
    <span v-if="displayPrev">
      <Button
        :disabled="disablePrev"
        icon="ios-arrow-dropleft"
        type="primary"
        @click="handlePrev"
      >上一条</Button>
    </span>
    <span v-if="displayNext">
      <Button
        :disabled="disableNext"
        icon="ios-arrow-dropright"
        type="primary"
        @click="handleNext"
      >下一条</Button>
    </span>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "modal_button",
  props: {
    modalButtonBus: Object,
    displayAdd: { type: Boolean, default: true },
    displayDel: { type: Boolean, default: true },
    displaySave: { type: Boolean, default: true },
    displayCancel: { type: Boolean, default: true },
    displayPrev: { type: Boolean, default: true },
    displayNext: { type: Boolean, default: true },

    disableAdd: { type: Boolean, default: false },
    disableDel: { type: Boolean, default: false },
    disableSave: { type: Boolean, default: false },
    disablePrev: { type: Boolean, default: false },
    disableNext: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {
    handleAdd() {
      //this.$parent.$parent.prepareAdd();
      this.modalButtonBus.$emit("prepareAdd");
    },
    handleDelete() {
      //this.$parent.$parent.prepareDel();
      this.modalButtonBus.$emit("prepareDel");
    },
    handleSubmit() {
      //this.$parent.$parent.prepareSubmit();
      this.modalButtonBus.$emit("prepareSave");
    },
    handleCancel() {
      //this.$parent.$parent.prepareCancel();
      this.modalButtonBus.$emit("prepareCancel");
    },
    handlePrev() {
      //this.$parent.$parent.preparePrev();
      this.modalButtonBus.$emit("preparePrev");
    },
    handleNext() {
      //this.$parent.$parent.prepareNext();
      this.modalButtonBus.$emit("prepareNext");
    }
  },
  watch: {}
};
</script>
