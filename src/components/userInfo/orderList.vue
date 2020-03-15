<template>
	<div class="dkuang clearfix deng">
		<p class="one fl">{{ status[info.state] }}</p>
		<div class="word clearfix">
			<ul class="fl clearfix">
				<li>{{info.time.year}}年{{info.time.month}}月{{info.time.day}}日 {{info.time.hour}}:{{info.time.minute}}</li>
				<li>{{info.name}}</li>
				<li>订单号:{{info.orderNum}}</li>
				<li>在线支付</li>
			</ul>
			<p class="fr">订单金额：<span>{{info.money}}</span>元</p>
		</div>
		<div class="shohou clearfix">
			<a  class="fl"><img :src="info.img" /></a>
			<p class="fl">
				<a >{{info.title}}</a>
				<span>{{info.city}}</span>
				<span>{{info.county}}</span>
			</p>
			<p class="fr">
			<!--	<a  v-if="info.state === 0">待评价</a>-->
				<a v-if="info.state === 1" :href="info.href">立即支付</a>
				<!--<a >订单详情</a>-->
			</p>
		</div>
	</div>
</template>

<script>
	//state    2代表失败，1代表还未支付， 0代表成功
	export default {
		props: {
			info: {
				type: Object
			}
		},
		data: function() {
			return {
				status: ["已完成","待支付","已关闭"]
			};
		}
	};
</script>

<style scoped>
  .dkuang{
	border: 1px solid #b0b0b0;
	position: relative;
	margin-bottom: 20px;
}
  .dkuang p.one{
	font-size: 16px;
	color: #8c8c8c;
	padding: 30px 0 20px 30px;
}
  .dkuang div.vewwl a.ckwl{
	font-size: 12px;
	display: inline-block;
	margin: 35px 0 0 10px;
}
  .dkuang div.vewwl a.ckwl:hover{
	color: #A10000;
}

  .dkuang .word{
	color: #757575;
	border-bottom: 1px solid #e0e0e0;
}
  .dkuang .word ul{
	margin: 0 0 30px 30px;
}
  .dkuang .word ul li{
	float: left;
	padding: 0 8px;
	border-right: 1px solid #e0e0e0;
}
  .dkuang .word ul li:first-child{
	padding:0 8px 0 0;
}
  .dkuang .word ul li:last-child{
	border-right: none;
}
  .dkuang .word p.fr{
	margin-right: 30px;
}
  .dkuang .word p.fr span{
	font-size: 20px;
	color: #A10000;
}
  .dkuang .shohou{
	padding: 30px;
}
  .dkuang .shohou > a{
	margin-top: 10px;
}
  .dkuang .shohou a.fl{
	width: 69px;
	margin-right: 30px;
}
  .dkuang .shohou a.fl img{
	width: 100%;
	height: 100%;
	display: block;
}
  .dkuang .shohou p.fl a{
	display: block;
}
  .dkuang .shohou p.fl a:nth-child(1){
	color: #666;
	margin-bottom: 10px;
}
  .dkuang .shohou p.fl a:nth-child(1):hover{
	color: #A10000;
}
  .dkuang .shohou p.fr a{
	display: block;
	width: 118px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	border: 1px solid #B0B0B0;
	color: #666;
	transition: all .3s;
	cursor: pointer;
}
  .dkuang .shohou p.fr a:hover{
	background: #3a3;
	color: #fff;
}
  .dkuang .shohou p.fr a:nth-child(1){
	margin-bottom: 10px;
}
</style>