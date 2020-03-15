<template>
	<div class="people">
		<div class="head">
			<img src="/static/img/head.jpg" alt="" />
		</div>
		<div class="info">
			<div class="name">癞疙宝</div>
			<div class="city">北京</div>
		</div>
		<div class="time">2017-09-04</div>
	</div>
</template>

<script>
	
	export default {
		props: {
			img: {
				type: String
			},
			name: {
				type: String
			},
			city: {
				type: String
			},
			time: {
				type: String
			}
		}
	};
</script>

<style scoped>
	.people {
		display: flex;
		width: 100%;
	}
	.head {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.info {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		margin-left: 1rem;
		font-size: 1.2rem;
	}
	.info .city {
		color: #2af;
	}
	.time {
		margin-left: auto;
		margin-top: 5px;
		color: #666;
	}
</style>