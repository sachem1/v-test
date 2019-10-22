<template>
  <div style="height:100%">
    <print-pdf :fileUrl="pdfUrl" :iframeState="iframeState"></print-pdf>
  </div>
</template>

<script>
import PrintPdf from "_com/print-pdf";
export default {
  name: "print_pdf",
  components: { PrintPdf },
  data() {
    return {
      iframeState: true,
      pdfUrl: ""
    };
  },
  mounted(){
      this.pdfUrl=this.$route.params.fileUrl
  }
};
</script>

<style>
</style>