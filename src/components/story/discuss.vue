<template>
	<div class="discuss" >
		<div v-if="comments">
			<div class="speaker owner" v-for="item in comments">
				<div class="head"><img :src="item.head" alt="" /></div>
				<div class="info">
					<div class="info_top">
						<span class="name">{{item.name}}：</span>
						<span class="speak">{{item.speak}}</span>
					</div>
					<div class="info_bottom">
						<span class="time">{{item.time}}</span>
						<span class="replyCount"></span>
						<span class="zan" @click.stop="zan(item.name,item.id, item)" :class="{active: item.hasZan}"><i class="iconfont icon-praise"></i>赞({{item.zan}})</span>
					</div>
					<div class="sendReview" v-if="item.isReply">
						<input type="text" />
						<button>发表评论</button>
					</div>
				</div>
			</div>
		</div>

		<form @submit.prevent="sendMsg">
			<textarea class="review" placeholder="在这里输入评论..." v-model="reviewVal" required></textarea>
			<input type="submit" class="btn fr" value="提交评论" />
		</form>
	</div>
	<!--		<div class="content" v-if="replys">
			<div class="speaker reviewer" v-for="item in replys">
				<div class="head"><img :src="item.head" alt="" /></div>
				<div class="info">
					<div class="info_top">
						<span class="name">{{item.self}}<span class="reply" v-if="item.to">&nbsp;&nbsp;回复&nbsp;&nbsp;{{item.to}}</span>：</span>
						<span class="speak">{{item.speak}}</span>
					</div>
					<div class="info_bottom">
						<span class="time">{{item.time}}</span>
						<span class="replyCount" @click.stop="reply(item)">回复({{item.replyNum}})</span>
						<span class="zan" @click.stop="zan(item.self,item)" :class="{active: item.hasZan}"><i class="iconfont icon-praise"></i>赞({{item.zan}})</span>
					</div>
					<transition name="fade">
						<div class="sendReview" v-if="item.isReply">
							<input type="text" v-model="item.value"/>
							<button @click.stop="sendReply(item,item.self,item.value)">回复</button>
						</div>
					</transition>
					
				</div>
			</div>
		</div>-->

</template>

<script>
	export default {
		props: {
			comments: {
				type: Array
			},
			id: String
		},
		data: function() {
			return {
				replys: this.comments.replay,
				reviewVal: ""
			};
		},
		methods: {
			zan: function(val,id, me) {
				if(localStorage.getItem("status") == null) {
					this.$router.push("/login");
					return;
				}
				var info = {
					target: val,
					id: id
				};

				if(me.preventClick) {
					return;
				}
				me.preventClick = true;
				this.$http.post("/api/zan", info).then(res => {
					if(res.body.error === 0) {
						this.$set(me, "hasZan", true);
						me.zan = res.body.zan;
					}
				});

			},
			sendMsg: function() {

				if(localStorage.getItem("status") == null) {
					this.$router.push("/login");
					return;
				}
				var info = {
					username: localStorage.getItem("username"),
					msg: this.reviewVal,
					homeId: this.$route.path.split("/")[2],
					id: this.id
				}
				this.$http.post("/api/review", info).then(res => {
					this.comments.push(res.body.review);
				});
			}
		}
	}
</script>

<style scoped>
	.review {
		width: 100%;
		resize: none;
		height: 100px;
		padding: 1rem 2rem;
	}
	
	.btn {
		padding: .6rem 1rem;
		border: none;
		color: #fff;
		background: #5b5;
		margin-top: -1px;
		cursor: pointer;
	}
	
	.btn:hover {
		background: #3b3;
	}
	
	.discuss {
		padding-left: 2rem;
	}
	
	.speaker {
		display: flex;
		margin-bottom: 5rem
	}
	
	.speaker .head {
		margin-right: 20px;
	}
	
	.owner .head {
		width: 60px;
		height: 60px;
	}
	
	.reviewer .head {
		width: 40px;
		height: 40px;
	}
	
	.discuss .head img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.discuss .zan.active {
		color: #f60;
	}
	
	.info {
		min-width: 70%;
	}
	
	.info .info_top {
		font-size: 1.1rem;
	}
	
	.info .info_top .name {
		color: #888;
		float: left;
	}
	
	.info .info_top .speak {
		line-height: 1.6;
	}
	
	.info .info_bottom {
		color: #888;
		font-size: 1.1rem;
		margin-top: 1rem;
	}
	
	.info .info_bottom .replyCount {
		margin: 0 6rem;
	}
	
	.info .info_bottom .zan {
		cursor: pointer;
	}
	
	.info .info_bottom .zan:hover i {
		color: #2cf;
	}
	
	.content {
		margin-left: 85px;
		background: #f9f9f9;
		margin-top: 10px;
	}
	
	.reviewer {
		padding: 4rem 2rem;
	}
	
	.reviewer {
		border-bottom: 1px dotted #ccc;
	}
	
	.sendReview {
		width: 100%;
		font-size: 0;
		margin-top: 1.5rem;
	}
	
	.sendReview>input {
		width: 80%;
		height: 36px;
		padding: 0 1rem;
		font-size: 1rem;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border: 1px solid #ccc;
	}
	
	.sendReview button {
		border: none;
		background: #45a;
		color: #fff;
		height: 36px;
		font-size: 1rem;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		padding: 0 1rem;
		cursor: pointer;
	}
	
	.sendReview button:hover {
		background: #45c;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .3s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>