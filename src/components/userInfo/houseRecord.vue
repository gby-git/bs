<template>
	<div class="record">
		<div class="my clearfix">
			<h2 class="fl" >出售记录</h2>
		</div>
		
		<div class="dlist clearfix" >
			<ul class="fl clearfix selled" v-if="data">
				<li v-for="item in data">
					<div class="pic fl"><img :src="item.img" alt="" width="100%" height="100%"/></div>
					<h2>房屋名称: <span>{{item.name}}</span></h2>
					<div class="aaaa">
						<p>地区<span>{{item.place}}</span></p>
						<p>单价<span>{{item.price}}</span></p>
						<p>户型<span>{{item.type}}</span></p>
					</div>
					<div class="sell" >已出售</div>
					<div class="time" v-if="item.time">{{item.time}}</div>
				</li>
			</ul>
			<div v-else style="margin-top: 20px;text-align: center;">没有房屋或者您还不是房东</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		computed: {
			data() {
				return this.$store.state.userData.customer;
			}
		}
	}
</script>

<style scoped>
	.dlist li{
		position: relative;
	}
	.time {
		position: absolute;
		right: 1rem;
		bottom: 3px;
	}
	.sell {
		font-size: 30px;
		color: #ccc;
		float: right;
		margin-right: 20px;
	}
	.pic {
		width: 200px;
		height: 100%;
		margin-right: 20px;
	}
	.aaaa {
		margin-left: 70px;
	}
	.aaaa p {
		display: inline-block;
		margin-right: 20px;
	}
	.aaaa p span {
		margin-left: 10px;
		color: #2cf;
	}
	.dlist ul {
		width: 100%;
	}
	.dlist ul li {
		border: 1px solid #ccc;
		width: 80%;
		height: 150px;
		margin: 40px 0;
	}
	.dlist ul li h2 {
		margin-top: 20px;		
		margin-left: 50px;
		font-weight: normal;
	}
	.record .my h2 {
		font-size: 22px;
		font-weight: normal;
	}
	
	.record .my h3 {
		font-size: 18px;
		font-weight: normal;
		margin: 10px 0;
	}
	
	.record .my h3 span {
		font-size: 15px;
	}
	
	.record .my a {
		font-size: 14px;
		font-weight: normal;
		color: #404040;
		margin: 8px 0 0 15px;
	}
	
	
</style>