<template>
	<div class="container" v-if="personInfo">
		<div class="people">
			<people :img="personInfo.img" :name="personInfo.name" :city="personInfo.place" :time="personInfo.time"></people>
		</div>
		<div class="wrap">
			<div class="pics" v-for="item in pics">
				<img :src="item" alt="" />
			</div>
		</div>
		<div class="content">
			<h1>{{content.title}}</h1>
			<p v-for="item in content.paragraph">{{item}}</p>
		</div>
		<div class="reviewer">
			<h1>评论区</h1>
		</div>
		<div class="reviewList" >
			<discuss :comments="reviewer" :id="storyId"></discuss>
		</div>
		
	</div>
</template>

<script>
	import people from "./people.vue";
	import discuss from "./discuss.vue";
	import paging from "../common/paging.vue";
	export default {
		data: function() {
			return {
				personInfo: null,
				storyId: null,
				pics: null,
				content: null,
				reviewer: null,
				pagingCount: 0,
				showCount: 4,
				start: 0,
				end: 0
			};
		},
		created: function() {
			this.getData();
			this.end = this.showCount;
		},
		methods: {
			getData: function() {
				this.$http.post("/api/storyDetail", this.$route.params).then(res => {
					this.storyId = this.$route.params.id;
					this.pics = res.body.imgs;
					this.personInfo = res.body.person;
					this.content = res.body.content;
					this.reviewer = res.body.reviewer;
					if (this.reviewer.length / 4 === 0) {
						this.pagingCount = parseInt(this.reviewer.length/4);
					}else {
						this.pagingCount = parseInt(this.reviewer.length/4) + 1;
					}
					
				});
			},
			printPage: function(val) {
				this.start = this.showCount * (val - 1);
				this.end = this.showCount * val;
			}
		},
		watch: {
			"$route": "getData"
		},
		components: {
			people,
			discuss,
			paging
		}
	};
</script>

<style scoped>
	.container {
		width: 50%;
		margin: auto;
	}
	.people {
		margin-top: 2rem;
	}
	.pics {
		margin: 2rem 0;
		width: 100%;
		
	}
	.pics img {
		width: 100%;
		height: 100%;
	}
	.content h1 {
		font-weight: normal;
		color: #358;
		border-bottom: 1px solid #358;
	}
	.content p {
		font-size: 1.3rem;
	}
	.reviewer {
		margin-bottom: 1rem;
	}
	.reviewer h1 {
		font-weight: normal;
		margin: 1rem 0;
		color: #358;
		border-bottom: 1px solid #358;
	}
	.reviewList {
		margin-bottom: 2rem;
		border-bottom: 1px solid #ccc;
		padding: 2rem 0;
	}
	.paging {
		text-align: right;
	}
</style>