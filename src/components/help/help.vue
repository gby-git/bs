<template>
	<div class="help clearfix">
		<div class="banner fl">
			<ul>
				<li><router-link to="/help/novice">新手上路</router-link></li>
				<li><router-link to="/help/bookHotel">预定房间</router-link></li>
				<li><router-link to="/help/payment">付款</router-link></li>
				<li><router-link to="/help/becomeLandlord">成为房东</router-link></li>
				<li><router-link to="/help/issueHouse">发布房源</router-link></li>
				<li><router-link to="/help/customerService">在线客服</router-link></li>
			</ul>
		</div>
		<div class="content fr">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	.help {
		width: 80%;
		margin: auto;
		padding: 4rem;
		min-height: 700px;
	}
	.banner {
		width: 30%;
	}
	.banner li {
		font-size: 1.3rem;
		margin-bottom: 3rem;
		text-align: center;
	}
	.banner .active {
		color: #45a;
		padding-bottom: 3px;
		border-bottom: 1px solid #45a;
	}
	.content {
		width: 70%;
		/*height: 300px;
		background: #ccc;*/
	}
</style>