<template>
	<div class="person" v-if="userData">
		<div class="tx clearfix">
			<div class="fl clearfix">
				<router-link to="userDetail" class="head fl"><img :src="userData.userInfo.head" /></router-link>
				<p class="fl"><span>{{userData.userInfo.name}}</span>
					<router-link to="userDetail">修改个人信息</router-link>
				</p>
			</div>
			<div class="fr">绑定邮箱：{{userData.userInfo.email}}</div>
		</div>
		<div class="bott">
			<div class="clearfix">
				<router-link :to="{ path: 'myOrder', query: {id: 2} }" class="fl"><img src="/static/img/gxin1.jpg" /></router-link>
				<p class="fl"><span>待支付的订单：<strong>{{waitPayNum}}</strong></span>
					<router-link :to="{ path: 'myOrder', query: {id: 2} }"> >查看待支付订单&gt;</router-link>
				</p>
			</div>
			<div class="clearfix">
				<router-link :to="{ path: 'myOrder', query: {id: 1} }" class="fl"><img src="/static/img/gxin2.jpg" /></router-link>
				<p class="fl"><span>已完成支付：<strong>{{completeNum}}</strong></span>
					<router-link :to="{ path: 'myOrder', query: {id: 1} }">查看支付成功的房屋&gt;</router-link>

				</p>
			</div>
			<div class="clearfix">
				<router-link :to="{ path: 'myOrder', query: {id: 3} }" class="fl"><img src="/static/img/gxin3.jpg" /></router-link>
				<p class="fl"><span>支付关闭的订单：<strong>{{closeNum}}</strong></span>
					<router-link :to="{ path: 'myOrder', query: {id: 3} }">>查看支付关闭的订单&gt;</router-link>

				</p>
			</div>
			<!--<div class="clearfix">
				<a  class="fl"><img src="/static/img/gxin4.jpg" /></a>
				<p class="fl"><span>收藏的房屋：<strong>0</strong></span>
					<router-link to="myOrder">收藏的房屋&gt;</router-link>
				</p>
			</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				userData: this.$store.state.userData
			}
		},
		computed: {
			waitPayNum: function(){
				var num = 0;
				this.userData.orderList.forEach(val => {
					if (val.state === 1) {
						num ++;
					}
				});
				return num;
			},
			completeNum: function() {
				var num = 0;
				this.userData.orderList.forEach(val => {
					if (val.state === 0) {
						num ++;
					}
				});
				return num;
			},
			closeNum: function() {
				var num = 0;
				this.userData.orderList.forEach(val => {
					if (val.state === 2) {
						num ++;
					}
				});
				return num;
			}
		}
	}
</script>

<style scoped>
	/*个人信息*/
	 .person {
		background: #fff;
		width: 100%;
	}
	
	 .person h2 {
		font-size: 22px;
		font-weight: normal;
		padding-bottom: 20px;
		border-bottom: 1px solid #E6E6E6;
		margin-bottom: 30px;
	}
	
	 .person .head {
		width: 90px;
		height: 90px;
		display: inline-block;
	}
	
	 .person .head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	 .person .tx {
		padding-bottom: 10px;
		border-bottom: 1px solid #E6E6E6;
	}
	
	 .person .tx div a.fl {
		display: block;
		/*width: 90px;
		height: 90px;*/
		border-radius: 45px;
		border: 1px solid #e3e3e3;
		padding: 1px;
	}
	
	 .person .tx div p {
		margin: 25px 0 0 15px;
	}
	
	 .person .tx div p span {
		display: block;
		font-size: 16px;
		margin-bottom: 10px;
	}
	
	 .person .tx div p a {
		display: block;
		color: #A10000;
	}
	
	 .person .tx div.fr {
		margin: 40px 0 0 0;
		color: #757575;
	}
	
	 .person .bott {
		padding: 20px 0;
		display: flex;
		flex-wrap: wrap;
	}
	
	 .person .bott div {
		flex: 1 1 50%;
		margin: 20px 0;
	}
	
	 .person .bott div p {
		font-size: 15px;
		color: #757575;
		margin: 35px 0 0 15px;
	}
	
	 .person .bott div p strong {
		color: #A10000;
	}
	
	 .person .bott div a {
		display: block;
		font-size: 12px;
		color: #757575;
		margin-top: 10px;
	}
</style>