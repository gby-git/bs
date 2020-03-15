<template>
	<div class="result" >
		<div class="search">	
			<search :search="searchData" v-if="searchData" ></search>
		</div>
		<div class="homes_wrap" v-if="searchResult && searchResult.homes.length !== 0">
			<div class="homes" >
				<div class="home_list" v-for="(item,index) in searchResult.homes" v-if="index >= start && index < end">
					<div class="home_pic">
						<router-link :to=" '/homeDetail' + item.href">
							<img :src="item.img" alt="" />
						</router-link>
					</div>
					<div class="home_info">
						<h2>{{item.title}}<span class="price">¥{{item.price}}/晚</span></h2>
						<div class="location">{{item.city}}/{{item.county}}<i class="iconfont "></i></div>
						<div class="home_type">
							<span>{{item.type}}</span>
							<span>{{item.size}}平方米</span>
							<div class="fr"><ratings :ratings="item.houseScore"></ratings></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="homes_wrap no" v-else>该地区没有房屋!!!</div>
		<div class="page" v-if="searchCount">
			<paging @getPage="printPage" :count="searchCount"></paging>
		</div>
		
	</div>
</template>

<script>
	import search from "../common/search.vue";
	import rating from "../common/rating.vue";
	import paging from "../common/paging.vue"
	export default {
		data: function() {
			return {
				start: 0,
				end: 6,
				searchConfig: null
			};
		},
		created: function() {
			
			//if (!this.searchData) {
				this.$http.get("/api/main").then(res => {
					var response = res.body;
					this.$store.commit("getSearchData", response.search);
				});
			//}
			
		},
		computed: {
			searchData: function() {
				return this.$store.state.searchData;
			},
			searchResult: function() {
				return this.$store.state.searchResult;
			},
			searchCount: function() {
					
				return this.$store.state.searchCount;
			}
		},
		components: {
			search: search,
			ratings: rating,
			paging: paging
		},
		methods: {
			printPage: function(val) {
				this.start = (val-1)*6;
				this.end = val*6;
				
			},
			getSearchResult: function() {
				//console.log(this.searchResult)
			}
			
		}
	};
</script>

<style scoped>
	.no {
		text-align: center;
		margin-top: 1rem;
		font-size: 2rem;
		color: #a45;
	}
	.search {
		background: #ccc;
	}
	.homes {
		width: 90%;
		margin: auto;
		padding: 2rem;
		display: flex;
		flex-wrap: wrap;
		font-size: 0;
	}
	.home_list {
		font-size: 1rem;
		width: 30%;
		display: inline-block;
		
		margin-bottom: 3rem;
	}
	.home_list:not(:nth-of-type(3n)) {
		margin-right: 5%;
	}
	.home_pic {
		
	}
	.home_pic img {
		width: 100%;
		height: 100%;
	}
	.home_info {
		flex: 1;
		margin: 1rem 0;
	}
	.home_info > h2 {
		font-weight: normal;
		color: #333;
		font-size: 1.3rem;
		cursor: pointer;
	}
	.home_info > h2:hover {
		text-decoration: underline;
	}
	.home_info .price {
		color: #f60;
		float: right;
	}
	.home_info .location {
		margin: 2px 0;
		font-size: 1rem;
	}
	.home_info .home_type span:first-child {
		color: #45a;
	}
	.page {
		width: 80%;
		margin: 0 auto;
		text-align: right;
	}
	.homes_wrap {
		min-height: 700px;
	}
</style>