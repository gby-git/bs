<template>
	<div class="myOrder">
		<div class="my clearfix">
			<h2 class="fl">我的订单</h2>
		</div>
		<div class="dlist clearfix">
			<ul class="fl clearfix" >
				<li v-for="(item, index) in titleList" @click="activeItem(index)" :class="{active: index===activeNum}">
					<span>{{item}}</span>
				</li>
			</ul>
			<!--<form action="#" method="get" class="fr clearfix">
				<input type="text" class="search" placeholder="请输入商品名称、订单号" />
				<input type="submit" class="submit" />
			</form>-->
		</div>
		<div class="content" v-if="orderInfo">
			<div v-for="item in orderInfo" v-if="!classify || item.state === (activeNum-1)">
				<order-list :info="item"></order-list>
			</div>
		</div>
		
	</div>
</template>

<script>
	import orderList from "./orderList.vue";
	export default {
		created() {
			if (this.$route.query.id) {
				this.activeNum = parseInt(this.$route.query.id);
				this.activeItem(this.activeNum);
			}
		},
		data: function() {
			return {
				titleList: ["全部订单", "已完成", "待支付", "已关闭"],
				activeNum: 0,
				classify: 0
			};
		},
		components: {
			"order-list": orderList
		},
		methods: {

			activeItem: function(index){
				this.activeNum = index;
				//console.log(index)
				if (index !== 0) {
					this.classify = 1;
				}else {
					this.classify = 0;
				}
			}
		},
		computed: {
			orderInfo: function() {
				return this.$store.state.userData.orderList;
			}
		}
	}
</script>

<style scoped>


.myOrder  .my h2{
	font-size: 22px;
	font-weight: normal;
}
.myOrder  .my h3{
	font-size: 18px;
	font-weight: normal;
	margin: 10px 0;
}
.myOrder  .my h3 span{
	font-size: 15px;
}
.myOrder   .my a{
	font-size: 14px;
	font-weight: normal;
	color: #404040;
	margin: 8px 0 0 15px;
}
.myOrder  .dlist{
	margin: 40px 0 32px;
}
.myOrder  .dlist ul{
	margin: 10px;
}
.myOrder  .dlist ul li{
	float: left;
	font-size: 16px;
	padding:0 20px ;
	border-right: 1px solid #e0e0e0;
}
.myOrder  .dlist ul li:last-child{
	border-right: none;
}
.myOrder  .dlist ul li span{
	display: inline-block;
	color: #8c8c8c;
	cursor: pointer;
}
.myOrder  .dlist ul li:nth-child(1){
	padding:0 20px 0 0 ;
}
.myOrder .dlist ul li.active span{
	color: #459;
}
.myOrder .dlist form{
	font-size: 0;
}
.myOrder .dlist form .search {
	width: 200px;
	padding: 0 1rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	height: 40px;
	vertical-align: middle;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.myOrder .dlist form .submit {
	font-size: 1rem;
	background: #4b4;
	border: none;
	padding: 3px 10px;
	height: 40px;
	vertical-align: middle;
	color: #fff;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.myOrder .dkuang{
	border: 1px solid #b0b0b0;
	position: relative;
	margin-bottom: 20px;
}

</style>