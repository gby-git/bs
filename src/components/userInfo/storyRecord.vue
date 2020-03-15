<template>
	<div class="wrap">
		<div v-for="item in data" class="list">
			<h2>{{item.title}}</h2>
			<p>{{item.content}}</p>
			<div>
				<img :src="item2" alt="" v-for="item2 in item.imgPath"/>
			</div>
			<button class="btn" @click="delRecord(item.id)">删除这条记录</button>
			<div class="bottom"></div>
		</div>

	</div>
</template>

<script>

	export default {
		computed: {
			data() {
				return this.$store.state.userData.myStory;
			}
		},
		methods: {
			delRecord(id) {
				var info = {
					id
				}
				this.$http.post("/api/delStory", info).then((res)=>{
					this.$store.commit("getUserData", res.body);
				});
			}
		}
	}
</script>

<style scoped>
	.list h2 {
		text-align: center;
		font-weight: normal;
		color: #444;
		font-size: 20px;
	}
	.list p {
		font-size: 14px;
		color: #444;
		text-indent: 2rem;
	}
	.list img {
		width: 100%;
		height: 300px;
	}
	.list .bottom {
		height: 3px;
		background: #45a;
		margin: 40px 0;
	}
	.list .btn {
		float: right;
		border: none;
		border-radius: 5px;
		background: #f40;
		padding: 5px 20px;
		color: #fff;
		cursor: pointer;
	}
</style>