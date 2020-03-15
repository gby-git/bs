<template>
	<div class="paging_wrap">
		<ul class="paging">
			<li @click="gotoFirst" class="first">首页</li>
			<li @click="gotoPrev" class="prev">上一页</li>
			<li v-for="(item,index) in num" :class="{active: current===index}" @click="gotoIndex(index,numArr[index])">{{ numArr[index] }}</li>
			<li @click="gotoNext" class="next">下一页</li>
			<li @click="gotoLast" class="last">尾页</li>
		</ul>
	</div>
</template>

<script>
	//count代表一共多少页，max代表最多显示几个分页格子,num代表当前显示页数
	export default {
		props: {
			count: {  								//格子总数
				validator: function(val) {
					return Math.floor(val) === val;
				}
			},
			max: { //最大格子数量
				type: Number,
				default: 7
			}
		},
		data: function() {
			return {
				current: 0, //当前active的格子
				num: 0, //当前只能显示的格子总数
				numArr: [] //当前显示的页码
			}
		},
		created: function() {
			//小于的情况
			if(this.count <= this.max) {
				this.num = this.count;
				for(var i = 0; i < this.num; i++) {
					this.numArr.push(i + 1);
				}
			} else if(this.count > this.max) {
				this.num = this.max;
				for(var i = 0; i < this.num; i++) {
					if(i === this.num - 1) {
						this.numArr.push("...")
					} else {
						this.numArr.push(i + 1);
					}
				}
			}

		},
		watch: {
			count: function() {
				this.numArr = [];
				this.current = 0;
				if(this.count <= this.max) {
					this.num = this.count;
					for(var i = 0; i < this.num; i++) {
						this.numArr.push(i + 1);
					}
				} else if(this.count > this.max) {
					this.num = this.max;
					for(var i = 0; i < this.num; i++) {
						if(i === this.num - 1) {
							this.numArr.push("...")
						} else {
							this.numArr.push(i + 1);
						}
					}
				}
				
				console.log(1111)
			}
		},
		methods: {
			pages: function(val) {
				if(val === this.num) {
					return "...";
				} else {
					return val;
				}

			},
			gotoFirst: function() {
				if(this.count > this.max) {
					var len = this.numArr.length;
					this.numArr.forEach((val, index) => {
						if(index === len - 1) {
							this.numArr[index] = "...";
						} else {
							this.numArr[index] = index + 1;
						}

					});
					this.current = 0;
				} else {
					this.current = 0;
				}
				this.$emit("getPage", this.numArr[this.current]);
			},
			gotoLast: function() {
				if(this.count > this.max) {
					var len = this.numArr.length;
					this.numArr.forEach((val, index) => {
						if(index === 0) {
							this.numArr[index] = "...";
						} else {
							this.numArr[index] = this.count - len + index + 1;
						}

					});
					this.current = this.max - 1;
				} else {
					this.current = this.num - 1;
				}
				this.$emit("getPage", this.numArr[this.current]);
			},
			gotoPrev: function() {
				if(this.count > this.max) {
					this.current--;
					if(this.current < parseInt(this.num / 2)) {
						var len = this.numArr.length;
						this.numArr[len - 1] = "...";
						if(this.current <= parseInt(this.num / 2)) {
							if(this.current < 0) {
								this.current = 0;
							}

							if(this.numArr[this.current] <= parseInt(this.num / 2)) {
								this.numArr[0] = 1;
							} else {
								this.numArr.forEach((val, index) => {
									if(index !== 0 && index !== len - 1) {
										this.numArr[index]--;
									}
								});
								this.current = parseInt(this.num / 2);
							}
						}
					}
				} else {
					this.current--;
					if (this.current < 0) {
						this.current = 0;
					}
				}
				this.$emit("getPage", this.numArr[this.current]);
			},
			gotoNext: function(step) {
				if(this.count > this.max) {
					this.current++;
					if(this.current > parseInt(this.num / 2)) {
						var len = this.numArr.length;
						this.numArr[0] = "...";
						if(this.numArr[len - 2] === this.count - 1) {
							this.numArr[len - 1] = this.count;
							if(this.current >= this.num) {
								this.current = this.num - 1;
							}
						} else {
							this.numArr.forEach((val, index) => {
								if(index !== 0 && index !== len - 1) {
									this.numArr[index]++;
								}
							});
							this.current = parseInt(this.num / 2);
						}
					}
				} else {
					this.current++;
					if (this.current > this.num - 1) {
						this.current = this.num - 1;
					}
				}
				this.$emit("getPage", this.numArr[this.current]);
			},
			gotoIndex: function(index, val) {
				if (val === "...") {
					return;
				}
				
				var len = this.numArr.length;
				if(this.count > this.max) {
					
					if(index > this.current) {
						if (this.num % 2 === 0) {
							var limit = this.count - parseInt(this.num / 2) + 1;
						}else {
							var limit = this.count - parseInt(this.num / 2)
						}
						
						var increase = index - this.current;
						this.current = index;
						if(this.current > parseInt(this.num / 2)) {
							if(val > limit) {
								this.current = parseInt(this.num / 2);
								this.numArr.forEach((value, index) => {
									if(index > this.current) {
										this.numArr[index] = limit + (index - this.current);
									} else {
										this.numArr[index] = limit + (index - this.current);
									}
								});
								this.numArr[0] = "...";
								this.current += val - limit;
							} else {
								this.current = parseInt(this.num / 2);
								this.numArr.forEach((value, index) => {
									if(index > this.current) {
										this.numArr[index] = val + (index - this.current);
									} else {
										this.numArr[index] = val + (index - this.current);
									}
								});
								this.numArr[0] = "...";
								this.numArr[len-1] = "...";
							}
						}

					} else {
						var limit2 = parseInt(this.num / 2) + 1;
						var increase = this.current - index;
						this.current = index;
						if(this.current < parseInt(this.num / 2)) {
							if(val < limit2) {
								this.current = parseInt(this.num / 2);
								this.numArr.forEach((value, index) => {
									if(index > this.current) {
										this.numArr[index] = limit2 + (index - this.current);
									} else {
										this.numArr[index] = limit2 + (index - this.current);
									}
								});
								this.numArr[len-1] = "...";
								this.current -= limit2 - val;
							} else {
								this.current = parseInt(this.num / 2);
								this.numArr.forEach((value, index) => {
									if(index > this.current) {
										this.numArr[index] = val + (index - this.current);
									} else {
										this.numArr[index] = val + (index - this.current);
									}
								});
								this.numArr[0] = "...";
								this.numArr[len-1] = "...";
							}
						}

					}
				}else {
					this.current = index;
				}
			this.$emit("getPage", this.numArr[this.current]);
			}
		}
	};
</script>

<style scoped lang="scss">
	.paging_wrap {
		width: 100%;
	}
	
	.paging {
		font-size: 0;
	}
	
	.paging .active {
		background: #45a;
		color: #fff;
	}
	
	.paging li {
		display: inline-block;
		font-size: 1rem;
		padding: 5px 12px;
		border-style: solid;
		border-color: #ccc;
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-left-width: 0px;
		cursor: pointer;
	}
	
	.paging li:hover {
		background: #45a;
		color: #fff;
	}
	
	.paging li:first-of-type {
		border-left-width: 1px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	
	.paging li:last-of-type {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>