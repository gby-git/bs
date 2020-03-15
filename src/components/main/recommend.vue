<template>
	<div class="hot">
		<div class="hot-ct">
			<h2>住宿优选</h2>
			<ul class="hot-classify">
				<li v-for="(item, index) in recommend" :class="{active: item.isActive}" @click="showItem(index)">{{item.area}}</li>
			</ul>
			<!------------------------------------------------------------------------>
			<div class="hot-detail" v-for="item in recommend" v-show="item.isActive">
				<div v-for="item2 in item.home">
					<div class="hot-detail-pic">
						<router-link :to="'/homeDetail'+item2.href">
							<img :src="item2.img" alt="" width="100%" height="100%" />
						</router-link>
					</div>
					<div class="hot-detail-type">
						<span class="hot-detail-money">¥{{item2.price}}</span>
						<span class="hot-detail-itr"><a href="">{{item2.introduction}}</a></span>
					</div>
					<div class="hot-detail-recommend">
						<em>推荐指数</em>
						<ratings :ratings="item2.houseScore"></ratings>
					</div>
				</div>
			</div>
			<!------------------------------------------------------------------------>
		</div>
	</div>
</template>

<script>
	import ratings from "../common/rating.vue";
	export default {
		props: {
			recommend: {
				type: Array
			}
		},
		data: function() {
			return {
				houseDetail: this.recommend.home
			};
		},
		created: function() {
			this.recommend.forEach( (val, index) => {
				if (index === 0) {
					this.$set( this.recommend[index], "isActive", true );
				}else {
					this.$set( this.recommend[index], "isActive", false );
				}
			} );
		},
		methods: {
			showItem: function(index) {
				this.recommend.forEach( (val,i) => {
					this.recommend[i].isActive = false;
				});
				this.recommend[index].isActive = true;
			}
		},
		components: {
			ratings: ratings
		}
	};
</script>

<style>
	.hot {
		width: 100%;
		position: relative;
		flex: 1;
	}
	
	.hot .hot-ct {
		width: 80%;
		margin: 0 auto;
	}
	
	.hot .hot-ct>h2 {
		font-size: 2rem;
		font-weight: normal;
		padding: 2rem 0;
		color: #555;
	}
	
	.hot .hot-classify {
		border-bottom: 1px solid #ccc;
	}
	
	.hot .hot-classify li {
		display: inline-block;
		margin-right: 3rem;
		font-size: 1.3rem;
		padding: 0 0 .5rem 0;
		cursor: pointer;
		transition: color .3s;
	}
	
	.hot .hot-classify .active {
		border-bottom: 1px solid #088;
		color: #088;
	}
	
	.hot .hot-classify li:hover {
		border-bottom: 1px solid #088;
		color: #088;
	}
	/*不同地区民宿情况*/
	
	.hot-detail {
		width: 100%;
		font-size: 0;
		margin-top: 3rem;
	}
	
	.hot-detail>div {
		display: inline-block;
		font-size: 1rem;
		width: 30%;
		height: 300px;
		vertical-align: top;
	}
	
	.hot-detail>div:hover {
		box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, .05);
	}
	
	.hot-detail>div:not(:nth-child(3n)) {
		margin-right: 5%;
	}
	
	.hot-detail .hot-detail-shadow {
		height: 0;
		width: 100%;
		background: rgba(0, 0, 0, .2);
		transition: height .5s;
		overflow: hidden;
		position: relative;
	}
	
	.hot-detail .hot-detail-shadow span {
		display: inline-block;
		font-size: 1.5rem;
		color: #eee;
		position: absolute;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
	
	.hot-detail .hot-detail-pic:hover .hot-detail-shadow {
		height: 100%;
	}
	
	.hot-detail .hot-detail-type {
		font-size: 1.3rem;
		margin: 5px 0 3px 0;
		cursor: default;
	}
	
	.hot-detail .hot-detail-type .hot-detail-money {
		color: #f60;
	}
	
	.hot-detail .hot-detail-recommend {
		font-size: 1.3rem;
		cursor: default;
	}
	
	.hot-detail .hot-detail-recommend em {
		font-size: 1.2rem;
		color: #088;
	}
	
	.hot-detail .hot-detail-recommend span {
		color: #f60;
	}
</style>