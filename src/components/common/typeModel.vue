<template>
	<div class="">
		<ul class="type-wrap">
			<li v-for="item in types" @click.stop="selectType(item)">{{item}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			types: Array
		},
		methods: {
			selectType: function(val) {
				this.$emit("getType", val);
			}
		}
	}
</script>

<style lang="scss">
	.type-wrap {
		padding: 1rem;
		display: flex;
		background: #fff;
		width: 400px;
		height: 50px;
		border: 1px solid #666;
		align-items: center;
		justify-content: space-around;
		position: relative;
		z-index: 999;
	} 
	.type-wrap > li {
		cursor: pointer;
	}
	.type-wrap > li:hover {
		color: #f60;
	}
</style>