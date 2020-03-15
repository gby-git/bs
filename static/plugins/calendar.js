/*
 * w=y+[y/4]+[c/4]-2c+[26(m+1)/10]+d-1蔡勒公式(只适用于现代日期)
 * y表示年的后两位
 * c表示世纪
 * m表示月份(1,2月对应为为13，14)
 */
/*
 * obj.lBtn左button
 * obj.rBtn右button
 * obj.el挂载点,必须为tbody
 * obj.date最小年月日对象
 */
(function() {

	var Model = function(obj) {
		var me = this;
		me.commonArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		me.leapArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(obj) {
			var el = document.querySelector(obj.el);
			if(!el || el.nodeName !== "TBODY") {
				throw new Error("挂载点必须为tbody");
			}
			me.lBtn = obj.lBtn;
			me.rBtn = obj.rBtn;
			me.tds = [].slice.call(el.getElementsByTagName("td")); //获取日历每个格子
			me.date = obj.date ? obj.date: me.getNow();
		
			var year = me.date.year;
			var month = me.date.month;
			var day = me.date.day;
			var y = year;
			var m = month;
			var d = day;	
		}
	};
	//返回一个月最大日期数
	Model.prototype.maxDays = function(y, m) {
		var me = this;
		return me.isLeapYear(y) ? me.leapArr[m - 1] : me.commonArr[m - 1];
	};
	Model.prototype.getNow = function() {
		var date = new Date();
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getUTCDate()
		}
	};
	//返回指定年月日对应星期几
	Model.prototype.week = function(year, month, day) {
		var mArr = [13, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var y = parseInt(String(year).slice(-2));
		var c = parseInt(String(year).slice(0, 2));
		var m = mArr[month - 1];
		var zeller = y + parseInt(y / 4) + parseInt(c / 4) - 2 * c + parseInt(26 * (m + 1) / 10) + day - 1;
		var week;
		week = zeller < 0 ? (zeller % 7 + 7) % 7 : zeller % 7;
		return week;
	};

	Model.prototype.isLeapYear = function(year) {
		return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	};

	Model.prototype.showDate = function(year, month, day) {
		var me = this;
		me.clear();
		var y = year;
		var m = month;
		var d = day ? day : 0;
		var start = me.week(y, m, 1);
		var end;
		var len = me.tds.length;
		if(me.isLeapYear(year)) {
			end = me.leapArr[m - 1] + start;
			printCalendar();
		} else {
			end = me.commonArr[m - 1] + start;
			printCalendar();
		}
		function printCalendar() {
			for(var i = 0, j = 1; i < len; i++) {
				if(i >= start && i < end) {
					me.tds[i].innerHTML = j++;
				} else {
					me.tds[i].classList.add("disabled");
				}
			}
		}
		me.disabled(start, start+d);

	};
	
	
	
	Model.prototype.totalDisabled = function() {
		var me = this;
		me.disabled(0, me.tds.length);
	};
	Model.prototype.disabled = function(start, end) {
		var me = this;
		var old = null;
		for(var i = start; i < end - 1; i++) {
			me.tds[i].classList.add("disabled");
		}
		me.active = me.tds[i]; //存放处于active的th
	};
	Model.prototype.showToday = function(year, month, day) {
		var me = this;
		var year = year || me.date.year,
			month = month || me.date.month,
			today = day || me.date.day,
			start = me.week(year, month, 1);
		me.disabled(start, start + today);
	};
	Model.prototype.clear = function() {
		var me = this;
		me.tds.forEach(function(td, i) {
			td.innerHTML = "";
			td.className = "";
		});
	};

	window.Calendar = Model;

})();