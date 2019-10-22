<template>
  <div>
   <div id="print"  >
      <p>葫芦娃，葫芦娃</p>

      <p>一根藤上七朵花</p>

      <p>风吹雨打都不怕</p>

      <p>啦啦啦啦啦</p>

      <p>...</p>
      <div class="no-print">不打印内容</div>
    </div>
    <Button type="primary" icon="md-print" v-print="'#print'">打印</Button>

    <print-pdf ></print-pdf>
  </div>
</template>

<script>
import PrintPdf from '_com/print-pdf';
export default {
  components:{PrintPdf},
    methods:{
        handlePrint(){
            this.$print(this.$refs.print)
        }
    }
};
</script>

<style>
</style>