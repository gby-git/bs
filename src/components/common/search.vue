<template>
	<div class="search">
		<form @submit.prevent="sendMsg">
			<div class="search-ct">
				<!--------------------------------------------------------------------------------------->
				<div class="local" @click.stop="clearShow(0)">
					<label>
						<input type="text" name="area" class="location" readonly="readonly" :value="zoneVal"/>
						<i class="iconfont icon-dingwei-copy"></i>
					</label>
					<area-model v-if="search" v-show="searchShow.local" @getLocal="printLocal" :areas="search.place">
						<h2>热门推荐</h2>
					</area-model>
				</div>
				<!--------------------------------------------------------------------------------------->
				<div class="check come_check_hook" @click.stop="clearShow(1)">
					<div class="cal_wrap">
						<span>入住</span>
						<input type="text" name="in_time" class="check-in" readonly="readonly" :value="comeVal" />
						<i class="iconfont icon-rili1"></i>
					</div>
					<calendar v-if="search.date" v-show="searchShow.come" :comeDate="search.date" @getDate="printComeDate" :el="'cal1'"></calendar>
				</div>
				<!--------------------------------------------------------------------------------------->
				<div class="check leave_check_hook" @click.stop="clearShow(2)">
					<div class="cal_wrap">
						<span>离开</span>
						<input type="text" name="out_time" class="check-out" readonly="readonly" :value="leaveVal" />
						<i class="iconfont icon-likai"></i>
					</div>
					<calendar v-if="leaveDate" v-show="searchShow.leave" :comeDate="leaveDate" @getDate="printLeaveDate" :el="'cal2'"></calendar>
				</div>
				<!--------------------------------------------------------------------------------------->
				<div class="local" @click.stop="clearShow(3)">
					<input type="text" name="room_type" class="room" readonly="readonly" :value="typeVal" />
					<i class="iconfont icon-denglu"></i>
					<type-model v-show="searchShow.type" :types="search.roomType" @getType="printType"></type-model>
				</div>
				<!--------------------------------------------------------------------------------------->
				<div class="search-s">
					<button type="submit">搜索</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	
	import calendar from "./calendar.vue";
	import areaModel from "./areaModel.vue";
	import typeModel from "./typeModel.vue";
	export default {
		props: {
			search: Object
		},
		data: function() {
			return {
				searchShow: {
					local: false,
					come: false,
					leave: false,
					type: false
				},
				zoneVal: "",
				comeVal: "",
				leaveVal: "",
				typeVal: "",
				leaveDate: null,
				cal: null
			};
		},
		created: function() {
			this.zoneVal = sessionStorage.getItem("local") ? sessionStorage.getItem("local") : this.search.place[0].place;
			this.comeVal = sessionStorage.getItem("comeVal") ? sessionStorage.getItem("comeVal") : "";
			this.leaveVal = sessionStorage.getItem("leaveVal") ? sessionStorage.getItem("leaveVal") : "";
			this.typeVal = sessionStorage.getItem("typeVal") ? sessionStorage.getItem("typeVal") : this.search.roomType[0];
			if (this.$route.path === "/homes") {
				console.log(this.$route)
				this.sendMsg();
			}
		},
		watch: {
			comeVal: function() {
				if(!this.cal) {
					this.cal = new Calendar();
				}
				if(this.leaveVal && this.comeVal >= this.leaveVal) {
					var lArr = toNumber(this.leaveVal);
					var cArr = toNumber(this.comeVal)
					lArr[2] = cArr[2] + 1;
					lArr[1] = cArr[1];
					lArr[0] = cArr[0];
					if(lArr[2] > this.cal.maxDays(lArr[0], lArr[1])) {
						lArr[1]++;
						lArr[2] = 1;
						if(lArr[1] > 12) {
							lArr[1] = 12;
							lArr[0]++;
						}
					}
					this.leaveVal = toArr(lArr);
				}

				function toNumber(str) {
					var arr = str.split("-").map(function(val) {
						if(val.charAt(0) == "0") {
							return parseInt(val.slice(1));
						} else {
							return parseInt(val);
						}
					});
					return arr;
				}

				function toArr(arr) {
					arr.forEach(function(val, index) {
						if(val < 10) {
							arr[index] = "0" + val;
						}
					});
					return arr.join("-");
				}

			}
		},
		components: {
			"area-model": areaModel,
			"type-model": typeModel,
			"calendar": calendar
		},
		methods: {
			printLocal: function(val) {
				this.zoneVal = val;
				this.searchShow.local = false;
			},
			printType: function(val) {
				this.typeVal = val;
				this.searchShow.type = false;
			},
			clearShow: function(index) {
				if(index == undefined) index = -1;
				var arr = ["local", "come", "leave", "type"];
				for(var i in this.searchShow) {
					if(arr[index] === i) {
						this.searchShow[i] = 1;
					} else {
						this.searchShow[i] = 0;
					}
				}
			},
			printComeDate: function(val) {
				this.comeVal = val;
				this.searchShow.come = 0;
				var str = val.split("-").map(function(val) {
					if(val.charAt("0") === "0") {
						return val.slice(1);
					} else {
						return val;
					}
				});
				this.leaveDate = {
					year: parseInt(str[0]),
					month: parseInt(str[1]),
					day: parseInt(str[2]) + 1
				}
			},
			printLeaveDate: function(val) {
				this.leaveVal = val;
				this.searchShow.leave = 0;
			},
			sendMsg: function() {
				var info = {
					local: this.zoneVal,
					comeVal: this.comeVal,
					leaveVal: this.leaveVal,
					typeVal: this.typeVal
				}
				for (var i in info) {
					sessionStorage.setItem(i, info[i]);
				}
				this.$http.post("/api/search", info).then(res => {
					var response = res.body;
				
						this.$router.push("/homes");
						this.$store.commit("getSearchConfig", info);
						this.$store.commit("getSearchResult", response);
						this.$store.commit("getSearchCount", response.homes.length);
					
				});
			},
			getConfig() {
				var info = {
					local: this.zoneVal,
					comeVal: this.comeVal,
					leaveVal: this.leaveVal,
					typeVal: this.typeVal
				}
				for (var i in info) {
					sessionStorage.setItem(i, info[i]);
				}
				
			}
		}
	};
</script>

<style scoped lang="scss">
	.search {
		width: 100%;
		height: 5rem;
		background: rgba(88, 88, 88, .5);
		z-index: 10000;
		display: flex;
		align-items: center;
	}
	
	.search>form {
		height: 3rem;
		width: 100%;
	}
	
	.search .search-ct {
		width: 80%;
		margin: 0 auto;
		font-size: 0;
	}
	
	.search .search-ct>div {
		display: inline-block;
		font-size: 1rem;
		vertical-align: top;
	}
	
	.search .search-ct>div:not(:last-child) {
		width: 18%;
		position: relative;
		height: 2.7rem;
		background: #fff;
		border-radius: 3px;
		border: none;
		margin-right: 3%;
	}
	
	.search .search-ct .local input {
		width: 100%;
		padding-left: 1rem;
		display: inline-block;
		height: 100%;
		border: none;
		border-radius: 3px;
	}
	
	.search .cal_wrap {
		height: 2.7rem;
	}
	
	.search .search-ct .check {
		font-size: 0;
	}
	
	.search .search-ct .check>* {
		font-size: 1rem;
	}
	
	.search .search-ct .check>div>span {
		float: left;
		line-height: 2.2;
		height: 100%;
		width: 30%;
		text-align: center;
		color: #999;
		font-size: 1.2rem;
		display: inline-block;
	}
	
	.search .search-ct .check input {
		float: left;
		height: 100%;
		border: none;
		display: inline-block;
		width: 70%;
		border-radius: 3px;
	}
	
	.search .search-ct>div i {
		position: absolute;
		right: 1rem;
		top: .7rem;
		cursor: pointer;
		color: #f60;
	}
	
	.search .search-ct .search-s button {
		height: 2.7rem;
		border: none;
		background: #f71;
		width: 6rem;
		color: #fff;
		border-radius: 4px;
		cursor: pointer;
		transition: background .3s;
	}
	
	.search .search-ct .search-s button:hover {
		background: #f92;
	}
</style>