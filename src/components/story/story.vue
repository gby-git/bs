<template>
	<div class="story">
		<h1 @click="write"><i class="iconfont icon-shenhebijijishibenxiezi"></i>我们的故事</h1>
		<div class="content" v-if="stories">
			<div class="list" v-for="(item,index) in stories" v-if="index >= start && index < end">
				<div class="pic">
					<router-link :to="'/story' + item.href">
						<img :src="item.img" alt="" />
					</router-link>
				</div>
				<div class="title"><span>{{item.place}}&nbsp;&nbsp;&nbsp;</span>{{item.title}}</div>
				<div class="bottom">
					<span class="head">
						<img :src="item.head" alt="" />
					</span>
					<!--<span class="zan"><i class="iconfont icon-praise"></i>{{item.zan}}</span>-->
					<span class="comment"><i class="iconfont icon-huijijiayuanhuifuicon01"></i>{{item.comment}}</span>
				</div>
			</div>
		</div>
		<div class="page fr" v-if="count">
			<paging :count="count" @getPage="printPage"></paging>
		</div>

	</div>
</template>

<script>
	
	import paging from "../common/paging.vue";
	export default {
		components: {
			paging
		},
		data: function() {
			return {
				stories: null,
				count: "",
				start: 0,
				end: 0,
				showNum: 6
			};
		},
		created: function() {
			this.getDate();
		},
		methods: {
			getDate: function() {
				this.$http.get("/api/story").then(res => {
					this.stories = res.body;
					if (this.stories.length / this.showNum === 0) {
						this.count = parseInt( this.stories.length / this.showNum );
					}else {
						this.count = parseInt( this.stories.length / this.showNum ) + 1;
					}
					this.end = this.start + this.showNum;
				});
			},
			printPage: function(val) {
				this.start = this.showNum*(val - 1);
				this.end = this.showNum*val;
			},
			write: function() {
				this.$router.push("/writeStory");
			}
		},
		watch: {
			"$route": "getDate"
		}
	};
</script>

<style scoped>
	.story {
		width: 80%;
		margin: auto;
	}
	.story > h1 {
		color: #666;
		font-weight: normal;
		margin: 1rem 0;
		cursor: pointer;
	}
	.story .write h1 {
		color: #666;
		font-weight: normal;
		margin: 1rem 0;
	}
	.story > h1 i {
		font-size: 22px;
		margin-right: 10px;
	}
	.content {
		font-size: 0;
	}
	.content .pic img {
		width: 100%;
		height: 100%;
	}
	.list {
		display: inline-block;
		width: 30%;
		font-size: 1rem;
		margin-bottom: 4rem;
	}
	.list:not(:nth-of-type(3n)) {
		margin-right: 5%;
	}
	.list .title {
		font-size: 1.3rem;
	}
	.list .bottom {
		display: flex;
	}
	.list .head {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.list .head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.list .zan {
		margin: 0 1rem;
	}
	.list .comment {
		margin-left: 1rem;
	}
</style>