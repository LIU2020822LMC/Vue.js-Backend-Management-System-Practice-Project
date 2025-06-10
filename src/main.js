import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "./router"
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {createPinia} from "pinia";
import "@/API/mock.js"
import api from "@/API/api"
import { useAllDataStore } from './stores';




//实现如果用户未登录将强制跳转到login页面的函数
function isRoute(to){
  let res = router.getRoutes();
  let resFil = res.filter(item=>item.path === to.path);
  return resFil.length > 0;
}
router.beforeEach((to,from) =>{
  if(to.path !== "/login" && !store.state.token){
    return {name :"login"}
  }
  // 判断是否有匹配的路由
  if (to.matched.length === 0) {
    return { name: "404" };
  }
})

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(pinia);
app.use(router).mount("#app");

const store = useAllDataStore();
store.addMenu(router,"refresh")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
