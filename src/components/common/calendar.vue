<template>
	<div class="calendar">
		<div class="time-detail">
			<h2><span class="time-year">{{comeDate.year}}</span>年<span class="time-month">{{comeDate.month}}</span>月</h2>
			<table>
				<thead>
					<tr>
						<th>日</th>
						<th>一</th>
						<th>二</th>
						<th>三</th>
						<th>四</th>
						<th>五</th>
						<th>六</th>
					</tr>
				</thead>
				<tbody class="comeBody" :class="el">
					<tr v-for="i in 6">
						<td v-for="i in 7" @click.stop="getDay($event)"></td>
					</tr>
				</tbody>
			</table>
			<button class="btn left" ref="lBtn" @click.prevent="prev">&lt;</button>
			<button class="btn right" ref="rBtn" @click.prevent="next">&gt;</button>
		</div>
	</div>

</template>

<script>
	export default {
		props: {
			comeDate: {
				type: Object
			},
			el: {
				type: String
			}
		},
		data: function() {
			return {
				oYear: this.comeDate.year,
				oMonth: this.comeDate.month,
				oDay: this.comeDate.day,
				cal: null
			};
		},
		created: function() {
			this.$nextTick(function() {
				var lBtn = this.$refs.lBtn;
				var rBtn = this.$refs.rBtn;
				if(!this.cal) {
					this.cal = new Calendar({
						el: "." + this.el,
						date: this.comeDate
					});
				}
				
				if(this.cal.maxDays(this.comeDate.year, this.comeDate.month) < this.comeDate.day) {
					this.comeDate.month ++;
					this.comeDate.day = 1;
					if (this.comeDate.month > 12) {
						this.comeDate.month = 1;
						this.comeDate.year ++;
					}
				}
				this.cal.showDate(this.comeDate.year, this.comeDate.month, this.comeDate.day);
			});

		},
		watch: {
			comeDate: function() {
				this.oYear = this.comeDate.year;
				this.oMonth = this.comeDate.month;
				this.oDay = this.comeDate.day;
				if( this.cal.maxDays(this.comeDate.year, this.comeDate.month) < this.comeDate.day) {
					this.comeDate.month ++;
					this.comeDate.day = 1;
					if (this.comeDate.month > 12) {
						this.comeDate.month = 1;
						this.comeDate.year ++;
					}
				}
				this.cal.showDate(this.comeDate.year, this.comeDate.month, this.comeDate.day);
			}
		},
		methods: {
			prev: function() {
				if(this.comeDate.year === this.oYear && this.comeDate.month === this.oMonth) {
					return;
				}
				this.comeDate.month--;
				if(this.comeDate.month < 1) {
					this.comeDate.month = 12;
					this.comeDate.year--;
				}
				if(this.comeDate.year === this.oYear && this.comeDate.month === this.oMonth) {
					this.cal.showDate(this.oYear, this.oMonth, this.oDay);
				} else {
					this.cal.showDate(this.comeDate.year, this.comeDate.month);
				}

			},
			next: function() {
				this.comeDate.month++;
				if(this.comeDate.month > 12) {
					this.comeDate.month = 1;
					this.comeDate.year++;
				}
				this.cal.showDate(this.comeDate.year, this.comeDate.month);

			},
			getDay: function(e) {
				var y = this.comeDate.year;
				var m = this.comeDate.month;
				var d = parseInt(e.target.innerHTML);
				var week = this.cal.week(y,m,d);
				var _week;
				switch (week) {
					case 1: _week = "一";break;
					case 2: _week = "二";break;
					case 3: _week = "三";break;
					case 4: _week = "四";break;
					case 5: _week = "五";break;
					case 6: _week = "六";break;
					case 7: _week = "日";break;
				}
				if(e.target.classList.contains("disabled")) {
					return;
				}
				if(d < 10) {
					d = "0" + d;
				}
				if(m < 10) {
					m = "0" + m;
				}
				var _date = y + "-" + m + "-" + d;
				this.$emit("getDate", _date, _week);
			}
		}
	};
</script>

<style scoped lang="scss">
	.calendar {
		width: 30rem;
	}
	
	.time-detail {
		height: 20rem;
		width: 30rem;
		border: 1px solid #333;
		background: #fff;
		z-index: 10001;
		background: #fff;
		position: relative;
		padding: 2rem;
	}
	
	.time-detail h2 {
		color: #f60;
		font-size: 1.5rem;
		text-align: center;
	}
	
	.time-detail table {
		width: 80%;
		border-collapse: collapse;
		border-spacing: 0;
		color: #eee;
		margin: 0 auto;
	}
	
	.time-detail thead {
		background: #999;
		border: 1px solid #ccc;
	}
	
	.time-detail td {
		width: 2rem;
		height: 2rem;
		text-align: center;
		border: 1px solid #ccc;
		color: #666;
		cursor: pointer;
	}
	
	.time-detail td:hover {
		color: #f60;
	}
	
	.time-detail .disabled {
		cursor: default;
		color: #ccc;
		background: #eee;
	}
	
	.time-detail .active {
		color: #f60 !important;
		border: 2px solid #f60 !important;
	}
	
	.time-detail .disabled:hover {
		color: #ccc;
	}
	
	.time-detail .btn {
		position: absolute;
		top: 46%;
		border: 1px solid #ccc;
		background: #fff;
		color: #666;
		height: 3rem;
		padding: 0 5px;
		transition: all .1s;
		cursor: pointer;
	}
	
	.time-detail .btn:hover {
		background: #eee;
	}
	
	.time-detail .left {
		left: 1rem;
	}
	
	.time-detail .right {
		right: 1rem;
	}
	
	.time-detail.leave {
		margin-left: 42%;
		/*display: block !important;*/
	}
</style>