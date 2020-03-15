<template>
	
	<div class="congratulation">
		<div class="con_ct">
			<i class="iconfont icon-likai"></i>
			<div class="right">
				<p class="con_sub">恭喜您已经成为了房东</p>
				<p class="con_title">现在您可以在出租房屋界面出租您的房间</p>
			</div>
		</div>
		<router-link to="/main" class="con_look">回到主页</router-link>
	</div>
	
</template>

<script>
	export default {
		
	};
</script>

<style scoped>
	/*申请提交成功*/
	
	.congratulation {
		width: 100%;
		margin: 5rem auto 0 auto;
		height: 300px;
		padding: 5rem 10rem;
		background: #EEF2FB;
		text-align: center;
		position: relative;
	}
	
	.con_ct {
		display: inline-block;
	}
	
	.con_ct i {
		margin-right: 2rem;
		color: #3b3;
		font-size: 2rem;
		float: left;
		margin-top: 1.5rem;
	}
	
	.con_ct .right {
		float: right;
		text-align: left;
	}
	
	.con_ct .con_title {
		color: #666;
	}
	
	.con_ct .con_sub {
		font-size: 1.5rem;
	}
	
	.con_look {
		position: absolute;
		bottom: 1rem;
		left: calc(50% - 3rem);
		padding: .5rem 1rem;
		background: #2af;
		border-radius: 4px;
		text-decoration: none;
		color: #eee;
	}
	
	.con_look:hover {
		background: #2bf;
	}
</style>