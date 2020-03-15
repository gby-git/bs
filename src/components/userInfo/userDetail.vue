<template>
	<div class="changePersonInfo" v-if="info">
		<h2>个人信息</h2>
		<div class="gxin">
			<div class="tx">
				<div class="head" v-if="headUrl">
					<img :src="headUrl" />
					<p class="avatar" @click="showHeadModel = true">修改头像</p>
				</div>
			</div>
			<div class="xx">
				<h3 class="clearfix">
					<strong class="fl">基础资料</strong>
					<a  class="fr" @click="isShow = true">编辑</a>
				</h3>
				<div>姓名：{{info.name}}</div>
				<div>性别：{{info.sex}}</div>
				<div>邮箱： {{info.email}}</div>
				<div>电话：{{info.phone}}</div>
			</div>
		</div>
		<transition name="fade" >
			<div class="model" v-show="isShow && info" >
				<model @close="closeModel" ></model>
			</div>
		</transition>
		<transition name="fade" >
			<div class="headModel" v-show="showHeadModel && info" >
				<head-model  @closeHead="closeHeadModel" ></head-model>
			</div>
		</transition>
	</div>
</template>

<script>
	import model from "./model.vue";
	import headModel from "./headModel.vue"
	export default {
		data: function() {
			return {
				isShow: false,
				showHeadModel: false
			};
		},
		components: {
			model,
			"head-model": headModel
		},
		methods: {
			closeModel: function() {
				this.isShow = false;
			},
			closeHeadModel: function() {
				this.showHeadModel = false;
			}
		},
		computed: {
			info: function() {
				
				return this.$store.state.userData.userInfo;
			},
			headUrl: function() {
				console.log(this.$store.state.userData.userInfo.head)
				return this.$store.state.userData.userInfo.head;
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: all .3s;
	}
	.fade-enter {
		transform: scale(.3);
		opacity: 0;
	}
	.fade-enter-to {
		transform: scale(1);
		opacity: 1;
	}
	.fade-leave {
		transform: scale(1);
		opacity: 1;
	}
	.fade-leave-to {
		transform: scale(.3);
		opacity: 0;
	}
	
	
	
	.changePersonInfo {
		background: #fff;
		width: 100%;
		min-height: 450px;
	
	}
	
	.changePersonInfo h2 {
		font-size: 22px;
		font-weight: normal;
		padding-bottom: 20px;
		border-bottom: 1px solid #E6E6E6;
		margin-bottom: 30px;
	}
	
	.changePersonInfo .gxin {
		display: flex;
	}
	
	.changePersonInfo .gxin div.tx {
		flex: 1;
		text-align: center;
		margin-top: 10%;
	}
	
	.changePersonInfo .gxin div.tx .head {
		width: 90px;
		height: 90px;
	}
	
	.changePersonInfo .gxin div.tx .head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.changePersonInfo .gxin div.tx p {
		color: #489;
		margin-top: 5px;
		cursor: pointer;
	}
	
	.changePersonInfo .gxin div.xx {
		flex: 3;
	}
	
	.changePersonInfo .gxin div.xx h3 {
		font-size: 16px;
		padding: 25px 0 15px;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.changePersonInfo .gxin div.xx h3.clearfix {
		padding: 0 0 15px;
	}
	
	.changePersonInfo .gxin div.xx h3.clearfix a {
		font-weight: normal;
		font-size: 12px;
	}
	
	.changePersonInfo .gxin div.xx div {
		border-bottom: 1px solid #e6e6e6;
		height: 50px;
		line-height: 50px;
		color: #666;
	}
	
	.changePersonInfo .gxin div.xx a {
		color: #f60;
	}
	.changePersonInfo .model, .changePersonInfo .headModel {
		position: absolute;
		width: 500px;
		height: 400px;
		left:0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		z-index: 999;
	}
</style>