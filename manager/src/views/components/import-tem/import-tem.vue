<template>
  <div class="import-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="500"
      @on-ok="handleConfirm"
      @on-cancel="handleCancel"
      class-name="vertical-center-modal"
      scrollable
    >
      <div class="import-wrapper-header">模板下载</div>
      <div class="import-wrapper-content">
        <ul>
          <li style="list-style:none" v-for="item in templateList" :key="item.name">
            <a :href="item.url">{{item.name}}</a>
          </li>
        </ul>
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
    templates: Array
  },
  data() {
    return {
      condition: "",
      selectedRow: {},
      currentIndex: 0,
      templateList: [
        {
          name: "核注清单"
          ,
          url: "http://localhost:12329/dd"
        }
      ]
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-visible-change", false);
    },
    handleConfirm() {
      // this.$emit("on-return-result", d);
      this.handleCancel();
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    templates: function(newValue) {
      console.log(typeof newValue);
      this.templateList = newValue;
    }
  }
};
</script>

<style>
</style>