<template>
	<div class="p_wrap">
		<div class="list" v-for="(item,index) in stepArr" :class="{active: index===step}">
			<div class="list_num">
				<span></span>
				<div>{{index+1}}</div>
				<span></span>
			</div>
			<div class="list_txt">
				<span>{{item}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			step: {
				type: Number,
				default: 0
			}
		},
		data: function() {
			return {
				stepArr: ["提交订单", "支付定金", "商家确认", "预定成功"]
			};
		}
	};
</script>

<style scoped lang="scss">
	.p_wrap {
		width: 100%;
		display: flex;
		font-size: 0;
	}
	
	.list {
		display: inline-block;
		height: 100%;
		font-size: 1rem;
		width: 25%;
	}
	
	.list .list_num {
		display: flex;
		height: 70%;
		width: 100%;
		align-items: center;
	}
	
	.list .list_num span {
		flex: 1;
		width: 10%;
		height: 5px;
		background: #ccc;
	}
	
	.list .list_num>div {
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
		color: #fff;
		text-align: center;
		line-height: 1.7rem;
		background: #ccc;
	}
	
	.list .list_txt {
		text-align: center;
		font-size: 1.1rem;
	}
	
	.list .active .list_num>div {
		background: #f60;
	}
	
	.list .active .list_txt {
		color: #f60;
	}
	
	.list .active .list_num span {
		background: #f60;
	}
	.p_wrap .active  .list_num > div {
		background: #f60;
	}
	.p_wrap .active .list_txt {
		color: #f60;
	}
	.p_wrap .active .list_num span {
		background: #f60;
	}
	
</style>