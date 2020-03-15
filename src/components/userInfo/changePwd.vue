<template>
	<div class="changePwd">

		<h2>修改密码</h2>
		<form action="#" method="get" class="remima" @submit.prevent="sendMsg">

			<p><span>原密码：</span><input type="password" v-model="fields.oldPwd" required/></p>
			<p class="op">输入原密码</p>
			<p><span>新密码：</span><input type="password"  v-model="fields.newPwd" required/></p>
			<p class="op">6-16 个字符，需使用字母、数字或符号组合，不能使用纯数字、纯字母、纯符号</p>
			<p><span>重复新密码：</span><input type="password"  v-model="fields.rePwd" required/></p>
			<p class="op">请再次输入密码</p>

			<input type="submit" value="提交" />
		</form>

	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				fields: {
					oldPwd: "",
					newPwd: "",
					rePwd: ""
				}
			};
		},
		methods: {
			sendMsg: function() {
				console.log(this.fields.newPwd,this.fields.rePwd)
				if (this.fields.newPwd !== this.fields.rePwd) {
					alert("你输入的密码不一致,请重新输入");
					return;
				}
				this.$http.post("/api/resetPassword", this.fields).then(res => {
					if (res.body.error === 0) {
						//console.log(1)
						localStorage.clear();
						this.$router.push("/login");
						
					}else {
						
					}
				});
			}
		}
	}
</script>

<style scoped>
	.changePwd {
		min-height: 430px;
	}
	.changePwd > h2 {
		font-size: 22px;
		font-weight: normal;
		margin-bottom: 50px;
		
	}
	form.remima {
		padding-left: 20px;
	}
	
	form.remima p {
		margin-bottom: 10px;
	}
	
	form.remima p:nth-child(1) {
		margin-bottom: 15px;
	}
	
	form.remima p:nth-child(1) input[type=checkbox] {
		margin-right: 5px;
		vertical-align: -2px;
	}
	
	form.remima p.op {
		margin-left: 140px;
		color: #757575;
	}
	
	form.remima p span {
		display: inline-block;
		width: 140px;
		text-align: right;
		font-size: 14px;
	}
	
	form.remima p input[type=text] {
		display: inline-block;
		width: 240px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #E0E0E0;
		text-indent: 10px;
	}
	
	form.remima p img {
		display: inline-block;
		margin-left: 10px;
		vertical-align: -16px;
		border: 1px solid #E0E0E0;
	}
	
	form.remima input[type=submit] {
		line-height: 30px;
		text-align: center;
		margin: 20px 0 0 30%;
		border-radius: 5px;
		background: #45a;
		color: #fff;
		border: 1px solid #ccc;
		padding: .3rem 2rem;
		cursor: pointer;
	}
</style>