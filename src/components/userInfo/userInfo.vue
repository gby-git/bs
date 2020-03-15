<template>
	<div class="PersonInfo" v-if="userInfo">
		<div class="wrapper clearfix">
			<div class="zuo fl">
				<h3>
					<a class="head"><img :src="userInfo.head"/></a>
					<p class="userInfo">
						<span class="nameList" :title="userInfo.name">{{userInfo.name}}</span>
						<span class="logout" @click="cancel">注销</span>
					</p>
				</h3>
				<div>
					<h4>个人中心</h4>
					<ul>
						<li class="">
							<router-link to="user">我的中心</router-link>
						</li>
						<li>
							<router-link to="myHouse">我的房屋</router-link>
						</li>
						<li>
							<router-link to="houseRecord">出售记录</router-link>
						</li>
						<li>
							<router-link to="storyRecord">我的故事</router-link>
						</li>
					</ul>
					<h4>我的交易</h4>
					<ul>
						<li>
							<router-link to="myOrder">我的订单</router-link>
						</li>
					<!--	<li>
							<router-link to="myReview">我的评论</router-link>
						</li>-->
					</ul>

					<h4>账户管理</h4>
					<ul>
						<li>
							<router-link to="userDetail">个人信息</router-link>
						</li>
						<li>
							<router-link to="changePwd">修改密码</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="you fr">		
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created: function() {
			this.getUserManageInfo();
		},
		data: function() {
			return {
				
			};
		},
		watch: {
			"$router": "getUserManageInfo"
		},
		methods: {
			getUserManageInfo: function() {
				var info = {
					userId: "shu"
				}
				this.$http.post("/api/userManage", info).then(res => {
					this.$store.commit("getUserData", res.body);
				});
			},
			cancel() {
				localStorage.removeItem("username");
				this.$router.push("/main");
			}
		},
		computed: {
			userInfo: function() {
				return this.$store.state.userData && this.$store.state.userData.userInfo;
			}
		}
	};
</script>

<style scoped>
	.PersonInfo {
		width: 100%;
		background: #f5f5f5;
	}

	.PersonInfo .wrapper {
		width: 80%;
		margin: auto;
	}
	
	.PersonInfo .zuo {
		margin: 20px 20px 20px 0;
		width: 18%;
		background: #fff;
		text-align: center;
		line-height: 40px;
		border: 1px solid #e4e4e4;
	}
	
	.PersonInfo .zuo h3 {
		border-bottom: 1px solid #A10000;
		cursor: pointer;
		padding: 10px 0;
		font-weight: normal;
	}
	
	.PersonInfo .zuo .head {
		width: 90px;
		height: 90px;
		display: inline-block;
	}
	
	.PersonInfo .zuo .head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.PersonInfo .zuo h3 a img {
		display: block;
		margin: 0 auto;
	}
	
	.PersonInfo .zuo .userInfo {
		display: flex;
		justify-content: space-around;
	}
	
	.PersonInfo .zuo h3 p {
		width: 70%;
		margin: 0 auto;
	}
	
	.PersonInfo .zuo h3 p span {
		border-bottom: 1px solid #fff;
	}
	
	.PersonInfo .zuo h3 span:hover {
		color: #6cd;
	}
	
	.PersonInfo .zuo .nameList,
	.PersonInfo .zuo .logout {
		max-width: 8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #666;
	}
	
	.PersonInfo .zuo div {
		background: #fcfcff;
	}
	
	.PersonInfo .zuo h4 {
		cursor: pointer;
		/*width: 90%;*/
		color: #2af;
		font-size: 15px;
		margin-bottom: 0;
	}
	
	.PersonInfo .zuo ul li a {
		display: inline-block;
		color: #757575;
		/*width: 40%;*/
		text-align: left;
		font-size: 14px;
	}
	
	.PersonInfo .zuo ul li.active a,
	.PersonInfo .zuo ul li a:hover {
		color: #f60;
	}
	.PersonInfo .zuo ul li .active {
		color: #f60;
	}
	.PersonInfo .you {
		background: #fff;
		width: 75%;
		padding: 50px;
		margin: 20px 0;
		border: 1px solid #e4e4e4;
		max-height: 600px;
		overflow-y: auto;
	}


</style>