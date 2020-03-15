<template>
	<div class="house_detail">
		<div class="content clearfix" v-if="home">
			<div class="left">
				<img :src="home.img" alt="" />
			</div>
			<div class="right">
				<h2></h2>
				<div class="right_ct">
					<div class="position"><strong>地点:</strong><span>{{home.city}}{{home.county}}</span></div>
					<div class="describe"><strong>户型:</strong><span>{{home.type}}</span></div>
					<div class="acreage"><strong>面积:</strong><span>{{home.size}}㎡</span></div>
					<div class="price"><strong>价格:</strong><span>{{home.price}}/晚</span></div>
				</div>
				<div class="facility">
					<h2>常规设施</h2>
					<ul>
						<li v-for="item in home.facilities" :class="{active: item.active===1}">
							<i class="iconfont" :class="item.icon"></i>
							<span>{{item.name}}</span>
						</li>
					</ul>
				</div>
				<span class="book_house" :class="{disabled: home.lend === 1}"><a @click="checkLogin(home.href)" :class="{disabled: home.lend === 1}">立即预定</a></span>
			</div>

		</div>
		<div class="house_int clearfix">
			<div class="left">
				<h2>房屋描述</h2>
				<p v-if="home">{{home.description}}</p>
				<h2>位置服务</h2>
				<div class="map" id="map">
					<!--<amap></amap>-->
				</div>
			</div>
			<div class="right">
				<h2>房屋推荐</h2>
				<div class="right_ct" v-for="item in recommend">
					<div class="right_ct_pic">
						<router-link :to="'/homeDetail' + item.href"><img :src="item.img" alt="" /></router-link>
					</div>
					<p>{{item.title}}</p>
					<span>{{item.type}}</span>
					<span>{{item.size}}㎡</span>
					<span>{{item.price}}/晚</span>
					<a @click="checkLogin(item.href)">立即预定</a>
					<!--<router-link :to="'/book' + item.href" ></router-link>-->
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Amap from  "../common/map.vue";
	export default {
		data: function() {
			return {
				home: null,
				recommend: null
			};
		},
		watch: {
			"$route": "getDate"
		},
		created: function() {
			this.getDate();

			
		},
		methods: {
			getDate: function() {
				if (this.$store.state.searchData) {
					var come = this.$store.state.searchData.date.month;
				}
				
				var info = {
					name: this.$route.params.name
				}
				this.$http.post("/api/homeDetail", this.$route.params).then((res) => {
					var response = res.body;
					this.home = response.main;
					this.recommend = response.recommend;

				    const map = new AMap.Map('map', {
				      zoom: 10,
				      center: this.home.coordinate
				    })
					
				});
			},
			checkLogin: function(href) {
				//console.log(this.$store.state.userStatus)
				if (this.home.lend === 1) {
					return;
				}
				if (localStorage.getItem("status") == null) {
					this.$router.push("/login");
				}else {
					this.$router.push(`/book${href}`);
				}
				
			}
		},
		components: {
//			amap: Amap
		}
	};
</script>

<style scoped>
	/*房屋图片展示*/
	.disabled {
		background: #ccc !important;
		cursor: not-allowed !important;
	}
	.content {
		width: 80%;
		margin: 0 auto 2rem auto;
		padding-top: 2rem;
		height: 400px;
	}
	
	.content .left {
		width: 50%;
		height: 100%;
		float: left;
	}
	
	.content .left img {
		width: 100%;
	}
	
	.content .right {
		width: 50%;
		padding: 0 0 0 8rem;
		float: right;
	}
	
	.content .right>h2 {
		font-weight: normal;
		font-size: 2rem;
		text-align: center;
	}
	
	.content .right_ct {
		padding: 2rem 0;
	}
	
	.content .right_ct>div {
		padding: 1rem;
		font-size: 1.2rem;
		display: inline-block;
	}
	
	.content .right_ct>div strong {
		font-weight: normal;
		color: #999;
		margin-right: 1rem;
	}
	
	.content .right_ct>div span {
		color: #2af;
	}
	
	.content .right_ct .price span {
		color: #f60;
	}
	/*常规设施*/
	
	.content .facility>h2 {
		font-weight: normal;
		padding-bottom: .5rem;
		border-bottom: 1px solid #ccc;
	}
	
	.content .facility>ul {
		font-size: 0;
	}
	
	.content .facility>ul li {
		display: inline-block;
		width: 33%;
		padding: .7rem 0;
		font-size: 1rem;
		color: #ccc;
	}
	
	.content .facility>ul li i {
		margin-right: 5px;
	}
	
	.content .facility>ul .active {
		color: #333;
	}
	
	.content .right .book_house {
		float: right;
		border: 1px solid #ccc;
		background: #2af;
		color: #fff;
		
		border-radius: 5px;
		cursor: pointer;
		transition: background .3s;
	}
	
	.content .right .book_house:hover {
		background: #4cf;
	}
	
	.content .right .book_house a {
		color: #fff;
		display: inline-block;
		padding: .4rem 2rem;
	}
	/*房屋介绍*/
	
	.house_int {
		width: 80%;
		margin: 0 auto;
	}
	/*右边*/
	
	.house_int .right {
		float: right;
		width: 30%;
		margin-top: 3rem;
		border: 1px solid #ccc;
		padding: 1rem 2rem;
	}
	
	.house_int .right h2 {
		font-weight: normal;
		font-size: 1.3rem;
		padding-bottom: 1rem;
	}
	
	.house_int .right_ct_pic img {
		width: 100%;
	}
	
	.house_int .right_ct {
		padding-bottom: 2rem;
		position: relative;
		margin-bottom: 2rem;
	}
	
	.house_int .right_ct>p {
		font-size: 1.2rem;
		margin: 5px 0;
		color: #3B83CB;
		font-weight: bold;
	}
	
	.house_int .right_ct>span {
		padding-right: 5px;
	}
	
	.house_int .right_ct>span:last-of-type {
		color: #f60;
		display: block;
		font-size: 1.2rem;
	}
	
	.house_int .right_ct>a {
		display: inline-block;
		text-decoration: none;
		padding: .5rem 1.5rem;
		color: #fff;
		background: #6cf;
		border-radius: 4px;
		position: absolute;
		right: 0;
		bottom: 0;
		transition: all .3s;
	}
	
	.house_int .right_ct>a:hover {
		background: #2cf;
	}
	/*左边*/
	
	.house_int .left {
		width: 65%;
		float: left;
	}
	
	.house_int .left>h2 {
		color: #389;
		font-weight: normal;
		padding-bottom: 1rem;
		border-bottom: 1px solid #ccc;
	}
	
	.house_int .left>p {
		text-indent: 2rem;
		line-height: 1.5;
		font-size: 1.1rem;
	}
	
	.house_int .map {
		width: 100%;
		height: 700px;
		overflow: hidden;
		position: relative;
		/*z-index: -1;*/
		margin-bottom: 2rem;
	}
	
	.house_int .comment_h2 span {
		color: #f60;
	}
	
	.house_int .comment {
		padding: 2rem;
	}
	
	.house_int .comment_all {
		margin-bottom: 1rem;
	}
	
	.house_int .comment_all strong {
		font-size: 1.2rem;
	}
	
	.house_int .comment_all span {
		margin-left: 2rem;
		color: #f60;
		font-size: 1.3rem;
	}
	
	.house_int .comment_classify {
		font-size: 1.2rem;
	}
	
	.house_int .comment_classify>span {
		margin-right: 1rem;
	}
	
	.house_int .comment_classify>span>i {
		font-style: normal;
		color: #2af;
	}
	/*评论区域title*/
	
	.house_int .comment_title {
		background: #eee;
		padding: 1rem 2rem;
		margin-top: 2rem;
		border: 1px solid #ccc;
	}
	
	.house_int .comment_title>span {
		font-size: 1.2rem;
		margin-right: 2rem;
	}
	
	.house_int .comment_title>span i {
		font-style: normal;
	}
	
	.house_int .comment_title .active {
		color: #f60;
	}
	/*评论区域内容*/
	
	.house_int .comment_ct {
		padding: 1rem 2rem;
		border: 1px solid #ccc;
		border-top: none;
		border-bottom-style: dashed;
	}
	
	.house_int .comment_ct_left img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-top: 1rem;
	}
	
	.house_int .comment_ct_right {
		width: calc(100% - 50px);
		padding-left: 2rem;
	}
	
	.house_int .comment_ct_right .right_name>span:last-of-type {
		margin-left: 4rem;
		font-size: 1.1rem;
		color: #888;
	}
	
	.house_int .comment_ct_right .right_detail {
		font-size: 1.2rem;
		/*text-align: justify;*/
		margin-top: 1rem;
		line-height: 1.6;
	}
	
	.house_int .comment_ct_right .right_detail>div>span {
		display: none;
	}
	
	.house_int .comment_ct_right .right_detail .more_btn {
		display: inline-block;
		color: #45a;
		margin-left: 5px;
		cursor: pointer;
	}
	
	.house_int .comment_ct_right .right_detail .more_btn:hover {
		text-decoration: underline;
	}
	
	.house_int .comment_replay {
		padding: .5rem 2rem;
		background: #eee;
		margin-top: 2rem;
		/*border: 1px solid #ccc;*/
		position: relative;
		border-radius: 5px;
	}
	
	.house_int .comment_replay::after {
		content: "";
		position: absolute;
		left: 2rem;
		top: -20px;
		border-style: solid;
		border-width: 10px;
		border-left-color: transparent;
		border-right-color: transparent;
		border-top-color: transparent;
		border-bottom-color: #eee;
	}
	
	.house_int .comment_replay>div {
		display: inline-block;
		vertical-align: top;
	}
	
	.house_int .comment_replay .comment_replay_head img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.house_int .comment_replay .comment_replay_ct {
		margin-left: 2rem;
		font-size: 1.1rem;
		width: 80%;
	}
	
	.house_int .comment_replay .comment_replay_ct p {
		margin: 5px 0;
	}
	
	.house_int .comment_replay .comment_replay_ct strong {
		margin-right: 2rem;
	}
	
	.house_int .comment_replay .comment_replay_ct span {
		color: #777;
	}
	/*评论区翻页功能*/
	
	.house_int .comment .page {
		background: #efefef;
		font-size: 0;
	}
	
	.house_int .comment .page .active {
		color: #f60;
	}
	
	.house_int .comment .page a:first-of-type {
		border-left: 1px solid #ccc;
	}
	
	.house_int .comment .page a {
		font-size: 1rem;
		padding: .5rem 1rem;
		display: inline-block;
		border-right: 1px solid #ccc;
	}
	
	.house_int .comment .page a:not(.active):hover {
		color: #2cf;
	}
</style>