<template>
	<div class="congratulation">
		<div class="con_ct">
			<i class="iconfont icon-likai"></i>
			<div class="right">
				<p class="con_sub">恭喜你修改密码成功!</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	.congratulation {
		width: 100%;
		min-height: 420px;
		padding: 5rem 10rem;
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