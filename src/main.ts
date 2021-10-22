import { createApp } from "vue";
import App from "./App.vue";

// cool
import { bootstrap } from "./core";

// router
import router from "./router";

// store
import store from "./store";

import "./mock";

// element-plus
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/index.scss";

// mitt
import mitt from "mitt";

// echarts
import VueECharts from "vue-echarts";

import setupFastCrud from "./setup-fast-crud";
import "./setup-fast-crud.scss";
const app = createApp(App);

bootstrap(app)
	.then(() => {
		// // echarts 可视图表
		app.component("v-chart", VueECharts);

		// // 事件通讯
		app.provide("mitt", mitt());

		//----------- 安装fast-crud--------------
		const i18n = null; //cool-admin-vue不支持国际化？
		setupFastCrud(app, i18n);

		app.use(store).use(router).use(ElementPlus, { size: "small" }).mount("#app");
	})
	.catch((err: string) => {
		console.error(`COOL-ADMIN 启动失败`, err);
	});

// 应用加载
store.dispatch("appLoad");

// @ts-ignore
window.__app__ = app;
