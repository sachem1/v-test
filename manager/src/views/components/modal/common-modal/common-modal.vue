<template>
  <div class="common-modal-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="500"
      @on-ok="handleConfirm"
      @on-cancel="handleCancel"
      class-name="vertical-center-modal"
      scrollable
    >
      <div class="common-modal-wrapper-header"></div>
      <div class="common-modal-wrapper-content">
        
      </div>
      <div slot="footer">
        <Button type="primary" icon="md-checkmark-circle-outline" @click="handleConfirm">确认</Button>
        <Button type="default" icon="ios-redo-outline" @click="handleCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "_lib";

export default {
  name: "parameter_lib",
  components: {},
  props: {
    title: String,
    visible: Boolean,
    messages: Array
  },
  data() {
    return {
      condition: "",
      selectedRow: {},
      currentIndex: 0,
      messageArr: [{
        code:1,
        message:'默认消息'
      }]
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-visible-change", false);
    },
    handleConfirm() {
      var d = JSON.stringify(this.selectedRow);
      this.$emit("on-return-result", d);
      this.handleCancel();
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    messages: function(newValue) {
      console.log(typeof newValue)
      this.messageArr = newValue;
    }
  }
};
</script>

<style>
</style>