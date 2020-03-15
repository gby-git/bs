<template>
	<div>
		<div class="step">
			<v-progress :step="step"></v-progress>
		</div>
		<form class="content" @submit.prevent="sendMsg" v-show="showStep">
			<div class="ct_left">
				<div class="ct_left_info ct_left_list">
					<h2><i class="iconfont icon-dingdan"></i>基本信息</h2>
					<div class="comeDay">
						<span>入住日期:</span>
						<input type="text" name="in_time" v-model="comeVal" readonly="readonly" class="start" autocomplete="off" required="required" @click="showComeCalendar = !showComeCalendar,showLeaveCalendar=false" />
						<div class="calendar" v-show="showComeCalendar" v-if="date">
							<calendar :comeDate="date" :el="'cal3'" @getDate="printComeDate"></calendar>
						</div>

					</div>
					<div class="leaveDay">
						<span>离开日期:</span>
						<input type="text" name="in_time" v-model="leaveVal" readonly="readonly" class="start" autocomplete="off" required="required" @click="showLeaveCalendar = !showLeaveCalendar,showComeCalendar=false" />
						<div class="calendar" v-if="date2">
							<calendar2 :comeDate="date2" :el="'cal4'" @getDate="printLeaveDate" v-show="showLeaveCalendar"></calendar2>
						</div>
					</div>

				</div>
				<div class="ct_left_people ct_left_list">
					<h2><i class="iconfont icon-touxiang"></i>个人信息</h2>
					<div><label>姓名<i>*</i></label><input type="text" required class="p_name" v-model="nameVal" /></div>
					<div><label>手机<i>*</i></label><input type="text" required class="phone" v-model="phoneVal" /></div>
					<div><label>邮箱</label><input type="text" required class="email" v-model="emailVal" /></div>
				</div>
				<div class="ct_left_cancel ct_left_list">
					<h2><i class="iconfont icon-shanchu"></i>退订规则</h2>
					<div>如果取消订单或没有入住，预付订金不予退还，如提前退房，剩余房费不退还</div>
					<div class="ct_left_btn">
						<button class="order_submit">确认订单</button>
					</div>
				</div>
			</div>
			<div class="ct_right" v-if="homeInfo">
				<div class="ct_right_pic">
					<img :src="homeInfo.img" alt="" />
				</div>
				<div class="ct_right_title"></div>
				<input type="hidden" class="user_id" value="">
				<div class="title">{{title}}</div>
				<div class="ct_right_int">
					<div></div>
					<span>地点:<i class="ct_right_int_local">{{homeInfo.county}}</i></span>
					<span>户型:<i class="ct_right_int_type">{{homeInfo.type}}</i></span>
					<span>面积:<i class="ct_right_int_area">{{homeInfo.size}}㎡</i></span>
				</div>
				
				<div class="ct_right_money">
					<span>支付金额：</span>
					<strong>¥{{homeInfo.price*days}}</strong>
				</div>
			</div>
		</form>
		<div class="step2" v-if="orderInfo">
			<div class="content2">
				<div class="content2_info clearfix">
					<div class="content2_title">
						<div class="iconfont icon-chenggong fl"></div>
						<div class=" fl">
							<div class="content2_success">提交订单成功，请尽快进行支付</div>
							<!--<div class="content2_time">请在<span class="end_time">{{orderInfo.deadTime}}</span>前完成支付,避免订单失效。</div>-->
						</div>
					</div>
				</div>
				<div class="content2_confir" >
					<div>订单编号：<span class="content2_confir_num">{{orderInfo.orderCode}}</span></div>
					<div>
						<span class="start_day">{{comeVal}}</span>
						<span class="start_week">星期{{homeInfo.comeWeek}}</span>
						<span>至</span>
						<span class="end_day">{{leaveVal}}</span>
						<span class="end_week">星期{{homeInfo.leaveWeek}}</span>
						<span class="live_day">{{days}}晚</span>
					</div>
				</div>
			</div>
			<div class="pay">
				<div>
					<span>订单总价</span>
					<span class="fin_pay">¥{{homeInfo.price*days}}</span>
				</div>
				<div class="pay_ali">
					<a :href="orderInfo.href" class="pay_immediate" @click="payment">立即支付</a>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import progress from "./payProgress.vue";
	import calendar from "../common/calendar.vue";
	import calendar2 from "../common/calendar2.vue";
	export default {
		data: function() {
			return {
				step: 0,
				date: null,
				date2: null,
				showComeCalendar: false,
				showLeaveCalendar: false,
				showStep: true,
				showStep2: false,
				showStep3: false,
				showStep4: false,
				comeVal: "",
				leaveVal: "",
				nameVal: "",
				phoneVal: "",
				emailVal: "",
				homeInfo: null,
				orderInfo: null,
				homeId: null,
				title: null
			};
		},
		created: function() {
			this.getDate();
		},
		computed: {
			days: function() {
				if(this.comeVal && this.leaveVal) {
					var come = this.comeVal.split("-").map(function(val) {
						return parseInt(val);
					});
					var leave = this.leaveVal.split("-").map(function(val) {
						return parseInt(val);
					});
					var day1 = new Date(come[0], come[1], come[2]);
					var day2 = new Date(leave[0], leave[1], leave[2]);
					if((day2 - day1) / (1000 * 60 * 60 * 24) === 0) {
						return 1;
					} else {
						return(day2 - day1) / (1000 * 60 * 60 * 24);
					}

				} else {
					return 1;
				}
			}
		},
		components: {
			"v-progress": progress,
			"calendar": calendar,
			"calendar2": calendar
		},
		methods: {
			printComeDate: function(val,week) {
				this.comeVal = val;
				this.comeWeek = week;
				this.showComeCalendar = false;
				var str = val.split("-").map(function(val) {
					if(val.charAt("0") === "0") {
						return val.slice(1);
					} else {
						return val;
					}
				});
				this.date2 = {
					year: parseInt(str[0]),
					month: parseInt(str[1]),
					day: parseInt(str[2]) + 1
				}
			},
			printLeaveDate: function(val, week) {
				this.leaveVal = val;
				this.leaveWeek = week;
				this.showLeaveCalendar = false;
			},
			getDate: function() {
				this.$http.post("/api/orderInfo", this.$route.params).then(res => {
					var response = res.body;
					this.date = response.comeDate;
					this.date2 = response.leaveDate;
					this.homeInfo = response;
					this.comeVal = format(this.date);
					this.leaveVal = format(this.date2);
					this.homeId = response.homeId;
					this.title = response.title;
					function format(obj) {
						var y = obj.year;
						var m = obj.month;
						var d = obj.day;
						if(d < 10) {
							d = "0" + d;
						}
						if(m < 10) {
							m = "0" + m;
						}
						return y + "-" + m + "-" + d;
					}
				});
			},
			sendMsg: function() {
				var info = {
					comeDate: this.comeVal,
					leaveDate: this.leaveVal,
					name: this.nameVal,
					email: this.emailVal,
					phone: this.phoneVal,
					price: this.homeInfo.price * this.days,
					homeId: this.homeId
				};
				console.log(info)
				this.$http.post("/api/orderSubmit", info).then(res => {
					if(res.body.error === 0) {
						this.step = 1;
						this.showStep = false;
						this.showStep2 = true;
						this.orderInfo = res.body;

					}else {
						alert(res.body.msg);
					}
				});
			},
			payment: function() {
				
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

			},
			"$route": "getDate"

		}
	};
</script>

<style scoped lang="scss">
	.step {
		width: 100%;
		padding: 0 20%;
		margin: auto;
		height: 80px;
		background: #fff;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		box-shadow: 0 2px 5px #ccc;
	}
	/*订单详情页面*/
	
	.content {
		width: 80%;
		margin: 0 auto;
		padding-top: 3rem;
		font-size: 0;
	}
	
	.content>div {
		vertical-align: top;
		font-size: 1rem;
	}
	
	.content .ct_left {
		width: 65%;
		padding: 2rem;
		border: 1px solid #ccc;
		display: inline-block;
	}
	
	.content .ct_left>div:not(:first-of-type) {
		margin-top: 2rem;
	}
	
	.content .ct_left_list>h2 {
		border-bottom: 1px solid #ccc;
		padding-bottom: .5rem;
	}
	
	.content .ct_left_list>h2 i {
		margin-right: 1rem;
		font-weight: normal;
		color: #f60;
	}
	
	.content .ct_left_list>div {
		padding: 1.1rem 2rem;
	}
	
	.content .ct_left_list>div>label {
		margin-right: 3rem;
		position: relative;
		display: inline-block;
		width: 4rem;
		font-size: 1.2rem;
	}
	
	.content .ct_left_list>div>label>i {
		color: #f60;
		vertical-align: 3px;
	}
	
	.content .ct_left_list>div>input {
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: .3rem 1rem;
	}
	
	.content .ct_left_list .ct_left_btn {
		text-align: center;
	}
	
	.content .ct_left_list .ct_left_btn button {
		color: #fff;
		padding: .5rem 2rem;
		background: #2af;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		transition: background .3s;
	}
	
	.content .ct_left_list .ct_left_btn button:hover {
		background: #2cf;
	}
	/*离开和入住表单样式*/
	
	.content .ct_left_list .ct_left_info_time {
		position: relative;
	}
	
	.content .ct_left_list .ct_left_info_time>input {
		border-radius: 4px;
		margin-left: 2rem;
		border: 1px solid #ccc;
		padding: .3rem 1rem;
		background: transparent;
	}
	
	.content .ct_left_time {
		padding: 1rem 0;
	}
	
	.content .ct_left_time>span {
		margin-right: 3rem;
	}
	
	.content .ct_left_time>input {
		line-height: 1.5rem;
		border-radius: 3px;
		border: 1px solid #ccc;
		padding: .3rem 1rem;
		width: 9rem;
	}
	
	.content .ct_left_time>select {
		width: 9rem;
	}
	
	.content .ct_left_time_tip {
		margin-left: 3rem;
		color: #aaa;
	}
	/*右侧房屋信息*/
	
	.content .ct_right {
		width: 30%;
		border: 1px solid #ccc;
		display: inline-block;
		margin-left: 5%;
	}
	
	.content .ct_right_pic img {
		width: 100%;
	}
	
	.content .ct_right_title {
		padding: .5rem 0;
		font-size: 1.4rem;
		color: #2af;
		text-indent: 1rem;
	}
	
	.content .ct_right_int {
		padding: 0 1rem;
	}
	
	.content .ct_right_int>div {
		color: #3bf;
		font-size: 1.3rem;
		margin-bottom: .8rem;
	}
	
	.content .ct_right_int span {
		width: 30%;
		display: inline-block;
	}
	
	.content .ct_right_int i {
		font-style: normal;
		color: #3377BB;
		cursor: pointer;
		margin-left: 1rem
	}
	
	.content .ct_right_int i:hover {
		text-decoration: underline;
	}
	
	.content .ct_right_money {
		height: 7rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		background: #FFFBF6;
	}
	
	.content .ct_right_money span {
		font-size: 1.7rem;
	}
	
	.content .ct_right_money strong {
		font-size: 2rem;
		color: #f60;
	}
	
	.content .comeDay>span,
	.content .leaveDay>span {
		margin-right: 2.1rem;
	}
	
	.calendar {
		position: absolute;
		left: 136px;
	}
	
	.content2 {
		width: 80%;
		margin: 3rem auto 0 auto;
		padding: 2rem 3rem;
		border: 1px solid #ccc;
	}
	
	.content2 .content2_title {}
	
	.content2 .content2_title .iconfont {
		font-size: 3.5rem;
		color: #3b3;
		margin-right: 2rem;
	}
	
	.content2 .content2_success {
		font-size: 1.5rem;
		font-weight: 400;
	}
	
	.content2 .content2_time {
		font-size: 1.1rem;
		margin-top: 4px;
	}
	
	.content2 .content2_time span {
		color: #f60;
	}
	
	.content2 .content2_confir {
		margin-top: 3rem;
		border-top: 2px dotted #ccc;
		padding: 2rem 4rem 0;
	}
	
	.content2 .content2_confir>div:first-of-type {
		margin-bottom: 1rem;
	}
	
	.content2 .content2_confir_num {
		color: #2af;
	}
	
	.step2 .pay {
		width: 80%;
		margin: 2rem auto 0 auto;
		padding: 0rem 3rem 2rem;
		border: 1px solid #ccc;
	}
	
	.step2 .pay>div {
		padding: 1.5rem 0;
		margin: 0 1rem;
		border-bottom: 1px dashed #ccc;
		font-size: 1.5rem;
	}
	
	.step2 .pay>div>span:last-of-type {
		color: #f60;
		margin-left: 1rem;
	}
	
	.step2 .pay>div>span i {
		font-style: normal;
		color: #aaa;
		margin-left: 1rem;
	}
	
	.step2 .pay .pay_ali {
		text-align: center;
		padding: 0;
		margin-top: 2rem;
		border: none;
	}
	
	.step2 .pay a {
		color: #fff;
		padding: .5rem 2rem;
		background: #2af;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		transition: background .3s;
		font-size: 1.1rem;
	}
	
	.step2 .pay a:hover {
		background: #2cf;
	}
	.title {
		font-size: 20px;
		color: #358;
		margin: 10px 0 0 10px;
	}
</style>