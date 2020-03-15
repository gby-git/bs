import Vue from 'vue'
import Router from 'vue-router'
import main from "../components/main/main.vue"
import story from "../components/story/story.vue"
import landlord from "../components/landlord/landlord.vue"
import rental from "../components/rental/rental.vue"
import help from "../components/help/help.vue"
import homes from "../components/homeResult/homes.vue"
//成为房东注册等待回复
import waitMessage from "../components/rental/waitMessage.vue"

//房屋详情
import homeDetail from "../components/homeDetail/homeDetail.vue";
//预定房间
import bookHome from "../components/bookHome/bookHome.vue";
//landlord的嵌套组件
import houseInfo from "../components/landlord/houseInfo.vue"
import houseDetail from "../components/landlord/houseDetail.vue"
import houseCheck from "../components/landlord/houseCheck.vue"
//登录注册组件
import login from "../components/login/login.vue"
import register from "../components/register/register.vue"
import registerSuccess from "../components/register/registerSuccess.vue"
//我的故事详情
import storyDetail from "../components/story/storyDetail.vue"
import writeStory from "../components/story/writeStory.vue"
//获取帮助
import novice from "../components/help/novice.vue"
import bookHotel from "../components/help/bookHotel.vue"
import payment from "../components/help/payment.vue"
import becomeLandlord from "../components/help/becomeLandlord.vue"
import issueHouse from "../components/help/issueHouse.vue"
import customerService from "../components/help/customerService.vue"
//个人信息管理
import userInfo from "../components/userInfo/userInfo.vue"

import user from "../components/userInfo/user.vue"
import myOrder from "../components/userInfo/myOrder.vue"
import myReview from "../components/userInfo/myReview.vue"
import userDetail from "../components/userInfo/userDetail.vue"
import changePwd from "../components/userInfo/changePwd.vue"
import changePwdSuccess from "../components/userInfo/success.vue"

import myHouse from "../components/userInfo/myHouse.vue"
import houseRecord from "../components/userInfo/houseRecord.vue"
import storyRecord from"../components/userInfo/storyRecord.vue"
import tip from "../components/success/tip.vue"



//后台管理















Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: "/main"
	},
		{
			path: "/main",
			component: main
		},
		{
			path: '/story',
			component: story
		},
		{
			path: "/story/:id",
			component: storyDetail
		},
		{
			path: "/writeStory",
			component: writeStory
		},
		{
			path: '/landlord',
			component: landlord,
			children: [{
					path: "",
					component: houseInfo
				},
				{
					path: "step2",
					component: houseDetail
				},
				{
					path: "step3",
					component: houseCheck
				}
			]
		},
		{
			path: "/tip",
			component: tip
		},
		{
			path: '/rental',
			component: rental
		},
		{
			path: "/rental/wait",
			component: waitMessage
		},
		{
			path: '/help',
			component: help,
			redirect: "/help/novice",
			children: [{
					path: "novice",
					component: novice
				},
				{
					path: "bookHotel",
					component: bookHotel
				},
				{
					path: "customerService",
					component: customerService
				},
				{
					path: "issueHouse",
					component: issueHouse
				},
				{
					path: "payment",
					component: payment
				},
				{
					path: "becomeLandlord",
					component: becomeLandlord
				}
			]

		},
		{
			path: "/login",
			component: login
		},
		{
			path: "/register",
			component: register
		},
		{
			path: "/register/success",
			component: registerSuccess
		},
		{
			path: "/homes",
			component: homes
		},
		{
			path: "/homeDetail/:name",
			component: homeDetail
		},
		{
			path: "/book/:name",
			component: bookHome
		},
		{
			path: "/userInfo",
			component: userInfo,
			redirect: "/userInfo/user",
			children: [{
					path: "user",
					component: user
				},
				{
					path: "myOrder",
					component: myOrder
				},
				{
					path: "myReview",
					component: myReview
				},
				{
					path: "userDetail",
					component: userDetail
				},
				{
					path: "changePwd",
					component: changePwd
				},
				{
					path: "success",
					component: changePwdSuccess
				},
				{
					path: "myHouse",
					component: myHouse
				},
				{
					path: "houseRecord",
					component: houseRecord
				},
				{
					path: "storyRecord",
					component: storyRecord
				}
			]
		}
	],
	linkActiveClass: "active"
})