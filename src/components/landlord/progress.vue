<template>
	<div class="progress">
		<div class="progress_list" v-for="(item,index) in info" :class="{active: index <= stat}"> 
			<div class="step_num">{{index+1}}</div>
			<div class="step_title">
				<h2>{{status[index]}}</h2>
				<div>{{item}}</div>
			</div>
			<div class="step_bar" v-if="index < info.length"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			stat: {
				type: Number,
				default: 0
			}
		},
		data: function() {
			var info = ["基本信息填写", "图片信息上传", "管理员审核"];
			return {
				info: info
			}
		},
		computed: {
			status: function() {
				var arr = [];
				var stats = ["进行中", "待提交","已完成"]
				stats.forEach((val, index) => {
					if (index < this.stat) {
						arr.push("已完成");
					}else if (index === this.stat) {
						arr.push("进行中");
					}else {
						arr.push("待提交");
					}
				});
				return arr;
			}
		}
	};
</script>

<style scoped>
	.progress {
		width: 100%;
		display: flex;
	}
	.progress .active {
		color: #3b3;
	}
	.progress .active .step_num {
		background: #3b3;
	}
	.progress .active .step_bar {
		background: #3b3;
	}
	.progress_list {
		display: flex;
		align-items: center;
		flex: 1;
	}
	.progress_list:last-child {
		flex: 0 0 auto;
	}
	.step_num {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #ccc;
		line-height: 20px;
		text-align: center;
		color: #fff;
	}
	.step_title {
		margin-left: 1rem;
	}
	.step_title h2 {
		font-size: 14px;
	}
	.step_bar {
		flex: 1;
		height: 5px;
		background: #ccc;
		margin: 0 2rem;
	}
</style>