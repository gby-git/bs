<template>
	<div class="rating_star">
		<span v-for="(item, index) in 5">
			<i class="iconfont icon-wujiaoxing1" v-if="index < all"></i>
			<i class="iconfont icon-bankexing" v-else-if="index < half+all"></i>
			<i class="iconfont icon-wujiaoxing1 white" v-else="index <= empty+all+half"></i>
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			ratings: {
				validator: function(val) {
					if (typeof val !== "number") {
						return false;
					}
					return val >= 0 && val <= 5;
				}
			}
		},
		computed: {
			all: function() {
				return Math.floor(this.ratings);
			},
			half: function() {
				var all = Math.floor(this.ratings);
				var decimal = this.ratings - all;
				if (decimal < 0.4) {
					return 0;
				}else {
					return 1;
				}
			},
			empty: function() {
				return this.ratings - this.all - this.half;
			}
		}
	};
</script>

<style lang="scss">
	.rating_star {
		color: #f60;
		display: inline-block;
	}
	.rating_star > span {
		padding-right: 3px;
	}
	.rating_star .white {
		color: #ccc;
	}
</style>