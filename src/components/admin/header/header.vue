<template>
	<div class="header">
		<div class="left">
			<div class="left_head"></div>
			<div class="left_name">admin</div>
		</div>
		<div class="right">
			<i class="iconfont icon-zufang"></i>
			<div class="administrators">
				管理员
				<div class='right_icon'></div>
				<div class="right_select">
					<div>个人中心</div>
					<div>
						<a href="/api/logout" style="color: #fff;">退出</a>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
.header {
	width: 100%;
	height: 5rem;
	background: #333;
	padding: 0 5rem 0 3rem;
}
/*left*/
.header .left {
	float: left;
	height: 100%;
	display: flex;
	align-items: center;
}

.header .left_head {
	height: 40px;
	width: 40px;
	background-image: url(/static/img/head.jpg);
	background-size: contain;
	border-radius: 50%;
}
.header .left_name {
	color: #ccc;
	padding-left: 1rem;

}


/*right*/
.header .right {
	float: right;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 1rem;
}
.header .right .right_icon {
	display: inline-block;
	border-width: 5px;
	border-top-color: #fff;
	border-right-color: transparent;
	border-left-color: transparent;
	border-style: solid;
	border-bottom-color: transparent;
	margin-left: 1rem;
	vertical-align: -3px;
}
.header .right > div {
	display: inline-block;
	color: #fff;
}
.header .right > i {
	color: #fff;
	margin-right: 2rem;
}
.header .right .administrators {
	cursor: pointer;
	height: 100%;
	line-height: 60px;
	padding: 0 1rem;
	position: relative;
}
.header .right .administrators:hover {
	background: #444;
	
}
.header .right .right_select {
	position: absolute;
	width: 86px;
	background: #444;
	left: 0;
	top: 60px;
	color: #fff;
	height: 0;
	transition: all .3s;
	overflow: hidden;
	z-index: 9999;
}
.header .right .administrators:hover .right_select {
	height: 75px;
}
.header .right .right_select > div {
	width: 100%;
	padding: 1.5rem 0;
	text-align: center;
	line-height: 0;
}
.header .right .right_select > div:hover {
	background: #333;
}

</style>