// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from "vue-resource";
import Vuex from "vuex"
import VueAwesomeSwiper from 'vue-awesome-swiper'





Vue.use(vueResource);
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = true

let store = new Vuex.Store({
	state: {
		searchResult: null,
		searchData: null,
		searchConfig: null,
		searchCount: 0,
		houseType: null,
		houseArea: null,
		homeId: null,
		username: null,
		userData: null,
		userStatus: -1
	},
	mutations: {
		getSearchResult(state, result) {
			state.searchResult = result;
		},
		getSearchData(state, result) {
			state.searchData = result;
		},
		getSearchCount(state, result) {
			if (result % 6 === 0) {
				state.searchCount = parseInt( result / 6 );
			}else {
				state.searchCount = parseInt( result / 6 ) + 1;
			}
		},
		getHouseType(state, result) {
			state.houseType = result;
		},
		getHouseArea(state, result){
			state.houseArea = result;
		},
		getSearchConfig(state, result) {
			state.searchConfig = result;
		},
		getHomeId(state, val) {
			state.homeId = val;
		},
		getUsername(state, val) {
			state.username = val;
		},
		clearUserName(state, val) {
			state.username = null;
		},
		getUserData(state, val) {
			state.userData = val;
		},
		changeUserHead(state, val) {
			state.userData.userInfo.head = val;
		},
		getUserStatus(state, val) {
			state.userStatus = val;
		}
	}
});
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

