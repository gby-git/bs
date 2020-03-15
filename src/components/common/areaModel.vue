<template>
	<div class="area-model">
		<div class="area-wrap">
			<slot><h2>在这里插入你想要插入的内容</h2></slot>
			<ul>
				<li v-for="item in areas" :class="{active: item.hot}" @click.stop="selectPlace(item.place)">{{item.place}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			areas: {
				type: Array,
				default: function() {
					return [{
						"place": "成都test",
						"hot": 1
					},{
						"place": "北京",
						"hot": 0
					}];
				}
			}
		},
		methods: {
			selectPlace: function(val) {
				this.$emit("getLocal", val);
			}
		}
	};
</script>

<style scoped lang="scss">
	.area-wrap {
		width: 400px;
		height: 200px;
		border: 1px solid #ccc;
		overflow-y: auto;
		padding: 1rem;
		position: relative;
		background: #fff;
		z-index: 222;
	}
	.area-wrap > .h2 {
		font-weight: normal;
		font-size: 14px;
	}
	.area-wrap > h2 {
		font-weight: normal;
		font-size: 14px;
	}
	.area-wrap > ul {
		font-size: 0;
	}
	.area-wrap > ul > li {
		font-size: 1rem;
		width: 20%;
		padding: 15px 5px;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}
	.area-wrap > ul > li.active {
		color: #f60;
	}
	.area-wrap > ul > li:hover {
		color: #088;
	}
</style>