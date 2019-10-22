<template>
  <div>
    <iframe
      v-show="iframeState"
      id="printIframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      width="100%"
      height="900"
      :src="pdfUrl"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "print_iframe",
  props: {
    fileUrl: String,
    iframeState:Boolean
  },
  data() {
    return {     
      //pdfUrl: "http://localhost:8080/public/document/testPrint.pdf"
    };
  },
  computed: {
    pdfUrl: function() {
      console.log(this.fileUrl);
      return "/public/generic/web/viewer.html?file=" + this.fileUrl;
    }
  },
  watch: {
    fileUrl: function(url) {
      if (url || url !== "") {
        this.pdfUrl = encodeURIComponent(url);
      }
    }
  }
};
</script>

<style>
#viewerContainer{
    height: 100%;
}
</style>