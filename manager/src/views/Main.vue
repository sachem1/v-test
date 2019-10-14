<style lang="less">
//@import "./main.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}"
    >
      <scroll-bar ref="scrollBar">
        <div id="nav-menus">
          <shrinkable-menu
            :shrink="shrink"
            @on-change="handleSubmenuChange"
            :theme="menuTheme"
            :before-push="beforePush"
            :open-names="openedSubmenuArr"
            :menu-list="menuList"
          >
            <div slot="top" class="logo-con">
              <div v-show="!shrink">
                <img class="logo-con-logmax" src="../images/logo_epass.png" key="max-logo" />
                <!--                            <div class="logo-title">Epass关务管理系统</div>-->
              </div>
              <img
                class="logo-con-logmin"
                v-show="shrink"
                src="../images/logo_epass-min.png"
                key="min-logo"
              />
            </div>
          </shrinkable-menu>
        </div>
      </scroll-bar>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="toggleClick"
          >
            <Icon type="ios-menu" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <!--                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>-->
            <strong>公告通知</strong>
          </div>
        </div>
        <div class="header-avator-con">
          <!--                    <div class="user-dropdown-menu-con">-->
          <!--                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">-->
          <!--                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">                                -->
          <!--                                <a href="javascript:void(0)">-->
          <!--                                    <span class="main-user-name">{{ userName }}</span>-->
          <!--                                    <Icon type="arrow-down-b"></Icon>-->
          <!--                                </a>-->
          <!--                                <DropdownMenu slot="list">-->
          <!--                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>-->
          <!--                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>-->
          <!--                                </DropdownMenu>-->
          <!--                            </Dropdown>-->
          <!--                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>-->
          <!--                        </Row>-->
          <!--                    </div>-->

          <div class="user-info">
            <Row>
              <Col span="16">
                <Icon class="header-icon" custom="iconfont icon-thirdaccount"></Icon>
                <span class="header-icon-des">欢迎 {{ userName }}</span>
              </Col>
              <Col span="4">
                <Icon class="header-icon" custom="iconfont icon-thirdhelp3"></Icon>&nbsp;
                <span class="header-icon-des">帮助</span>
              </Col>
              <Col span="4">
                <Icon class="header-icon" custom="iconfont icon-thirdexit3"></Icon>
                <span class="header-icon-des">退出</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view :key="$route.name"></router-view>
        </keep-alive>
      </div>
    </div>
    <Spinner name="fading-circle" color="#2d8cf0" v-show="isSpinShowing" :noFadeIn="noFadeIn" />
  </div>
</template>
<script>
import Vue from "vue";
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import scrollBar from "@/views/my-components/scroll-bar/vue-scroller-bars";
//import axios from '@/libs';
import axios from "axios";
import Spinner from "vue-spinkit";

Vue.component("Spinner", Spinner);

const spinDelay = 500;

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    scrollBar
  },
  data() {
    return {
      shrink: false,
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      spinTimeout: null,
      spinQueuedTime: null,
      isSpinShowing: false,
      noFadeIn: true
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    userName() {
      return this.$store.state.login.loginName;
    }
  },

  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      // this.$store.commit("updateMenulist");
      if (pathArr) {
        if (pathArr.length >= 2) {
          this.$store.commit("addOpenSubmenu", pathArr[1].name);
        }
      }
      //this.userName = Cookies.get("userName");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);

      var vm = this;
      axios.interceptors.request.use(
        function(config) {
          // Delay show spin
          if (vm.spinTimeout != null) {
            clearTimeout(vm.spinTimeout);
          }
          // config.headers['Authorization'] = util.getToken()
          vm.spinQueuedTime = new Date();
          vm.spinTimeout = setTimeout(vm.showSpin, spinDelay);
          return config;
        },
        function(error) {
          // Do something with request error
          vm.cancelSpin();
          vm.$Message.error("网络故障，请稍候再试。");

          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        function(response) {
          // Do something with response data
          vm.cancelSpin();
          return response;
        },
        function(error) {
          // Do something with response error
          vm.cancelSpin();
          console.log(error);
          if (
            !!error.response &&
            !!error.response.data.error &&
            !!error.response.data.error.message &&
            error.response.data.error.details
          ) {
            vm.$Message.error(error.response.data.error.message);
          } else {
            var faultSource = "系统";
            if (error.response == undefined || error.response.status == 502) {
              faultSource = "网络";
            }
            vm.$Message.error(faultSource + "故障，请稍候再试。");
          }

          return Promise.reject(error);
        }
      );
    },
    showSpin() {
      this.isSpinShowing = true;
    },
    hideSpin() {
      if (this.isSpinShowing) {
        this.isSpinShowing = false;
      }
    },
    cancelSpin() {
      if (
        this.spinTimeout != null &&
        new Date().getTime() - this.spinQueuedTime.getTime() < spinDelay
      ) {
        clearTimeout(this.spinTimeout);
        this.spinTimeout = null;
      } else {
        this.hideSpin();
      }
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    async handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        await this.$store.dispatch({
          type: "user/logout",
          data: {
            token: util.getToken(),
            userId: this.$store.state.login.UserId
          }
        });

        this.$store.commit("clearOpenedSubmenu");
        this.$router.push({
          name: "login"
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {},
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    scrollBarResize() {
      if (this.$refs.scrollBar) this.$refs.scrollBar.resize();
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (!pathArr) return;
      if (!pathArr && pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
    openedSubmenuArr() {
      setTimeout(() => {
        this.scrollBarResize();
      }, 300);
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.scrollBarResize);
  },
  created() {
    // 	// 显示打开的页面的列表
    this.$store.commit("setOpenedList");
    // 	console.log('created router-view:' + JSON.stringify(this.$route));
  },
  dispatch() {
    window.removeEventListener("resize", this.scrollBarResize);
  }
};
</script>


<style scoped lang="less">
.header-icon {
  color: #2d8cf0;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.header-icon-des {
  cursor: pointer;
}
</style>