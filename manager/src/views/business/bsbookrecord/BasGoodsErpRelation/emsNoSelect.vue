<template>
    <Select
      v-model="currentEmsNo"
      filterable
      @on-change="selectchange"
    >
      <Option
        v-for="item in emsNoList"
        :value="item"
        :key="item"
      >{{ item }}</Option>
    </Select>
</template>
<script>
export default {
  props: {
    emsNo: {
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      emsNoList: [],
      currentEmsNo: ""
    };
  },
  methods: {
         getEmsNoList () {
	            this.$store.dispatch({
                    type: 'goodsErp/getEmsNoList',
                    data:{custromeCode:this.$store.state.login.userinfo.organizationCode}
	            }).then(res => {
	                this.emsNoList = res.data;
	            });
            },
            selectchange(value){
                debugger;
                this.$emit("on-select-change", value);
            },
            setCurrentEmsNo(v){
                this.currentEmsNo=v;
            }
  },
  created() {
      this.getEmsNoList();
  },
  watch: {
      emsNo:function(v){
          debugger;
          this.currentEmsNo=v;
      }
  },
};
</script>