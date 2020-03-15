<template>
	<div>
		<slide :imgs="slideImg" v-if="slideImg"></slide>
		<search :search="search" v-if="search"></search>
		<recommend :recommend="recommend" v-if="recommend"></recommend>
		
	</div>
</template>

<script>
	import fullSlide from "./full-slide.vue";
	import search from "../common/search.vue";
	import recommend from "./recommend.vue";

	export default {
		data: function() {
			return {
				recommend: null,
				slideImg: null,
				search: null
			}
		},
		created: function() {
			this.$http.get("/api/main").then(res => {
				var res = res.body;
				this.search = res.search;
				this.recommend = res.recommend;
				this.slideImg = res.slideImg;
				this.$store.commit("getSearchData", this.search);
				this.$store.commit("getHouseType", this.search.roomType);
				this.$store.commit("getHouseArea", this.search.place);
			});
		},
		components: {
			slide: fullSlide,
			search: search,
			recommend: recommend
		}
	}
</script>

<style>

</style>