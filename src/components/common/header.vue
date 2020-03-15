<template>
	<div>
		<div class="header">
			<div class="header-ct">
				<div class="left">欢迎访问我们</div>
				<div class="right">
					<!--<div class="list" v-for="item in models">
						<router-link :to="item.src">{{item.model}}</router-link>
					</div>-->
					<div class="list">
						<router-link to="/main">首页</router-link>
					</div>
					<div class="list">
						<router-link to="/story">我的故事</router-link>
					</div>
					<div class="list">
						<router-link to="/landlord">出租房屋</router-link>
					</div>
					<div class="list">
						<router-link to="/rental">成为房东</router-link>
					</div>
					<div class="list">
						<router-link to="/help">获取帮助</router-link>
					</div>
					
					
					
					<div class="login" v-show="hasLogin == null">
						<span><router-link to="/login">登录</router-link></span>
						<span><router-link to="/register">注册</router-link></span>
					</div>
					<div class="user" v-show="hasLogin !== null">
						<span style="color: #fff">
							<router-link to="/userInfo" class="username">{{hasLogin}}</router-link>
						 您好</span>
						<div class="set">
							<div><router-link to="/userInfo">设置</router-link></div>
							<div @click="cancel"><router-link to="/main" >退出</router-link></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import {mapState} from "vuex"
	export default {
		props: {
			models: {
				type: Array
			},
			hasLogin: null
		},
		
		methods: {
			cancel: function() {
				this.$router.push("/main");
				this.hasLogin = null;
				localStorage.clear();
			}
		}
	};
</script>

<style scoped lang="scss">
	.header {
		height: 5rem;
		background: #333;
	}
	
	.header-ct {
		height: 100%;
		width: 80%;
		margin: 0 auto;
		position: relative;
	}
	
	.header-ct>.left,
	.header-ct>.right {
		display: inline-block;
		height: 100%;
	}
	
	.header .left {
		color: #ccc;
		cursor: pointer;
		transition: transform .3s;
		vertical-align: top;
		line-height: 5rem;
	}
	
	.header .left:hover {
		transform: translate(.6rem, 0);
	}
	
	.header .right {
		float: right;
		position: relative;
		font-size: 0;
	}
	
	.header .right>div {
		font-size: 1rem;
		display: inline-block;
		width: 7rem;
		height: 100%;
		/*margin-right: .5rem;*/
		transition: background .2s;
	}
	
	.header .right>.list:hover {
		background: #555;
	}
	
	.header .right .login {
		width: auto;
		margin-right: 0;
		color: #fff;
	}
	
	.header .right .login span {
		cursor: pointer;
		padding: 0 3px 0 0;
		transition: color .2s;
	}
	
	.header .right .login span:hover {
		color: #88ff99;
	}
	
	.header .right>div>a {
		color: #eee;
		display: inline-block;
		font-size: 1.2rem;
		width: 100%;
		height: 100%;
		line-height: 5rem;
		text-align: center;
	}
	
	.header .right>div span a {
		color: #eee;
	}
	
	.header .right>div a:hover {
		color: #fff;
	}
	
	.header .right .active {
		background: #555;
	}
	.header .right .login,.header .right .user {
		margin-left: 1rem;
		width: auto;
	}
	.header .right .username {
		color: "#EEF2FB";
		cursor: pointer;
	}
	.set {
		position: absolute;
		background: #333;
		width: 7rem;
		z-index: 9999;
		height: 0px;
		overflow: hidden;
		transition: height .3s;
	}
	.user:hover .set{
		height: 90px;
	}
	.set > div {
		padding: 1rem 0;
		text-align: center;
		
		cursor: pointer;
	}
	.set > div a {
		color: #fff;
	}
	.set > div:hover {
		background: #000;
	}
</style>