<template>
	<div class="bg">
			<div class="ct">
		<div class="logo"><img src="/static/img/logo.jpg" alt="logo" /></div>
		<form @submit.prevent="sendMsg">
			<div class="user field clearfix">
				<label for=""><i class="iconfont icon-denglu"></i></label>
				<input type="email" name="email" placeholder="邮箱" required v-model="emailVal" />
			</div>
			<div class="error-msg" id="image-code-err"><span></span></div>
			<div class="message field clearfix">
				<label for=""><i class="iconfont icon-youjian"></i></label>
				<input type="text" name="email_code" placeholder="获取邮箱验证码" v-model="codeVal" />
				<span :class="{active: emailVal}" @click="getCode" v-show="!GETCODE">获取验证码</span>
				<span v-show="GETCODE" class="active">还剩{{TIMELIMIT}}s</span>
			</div>
			<div class="password field clearfix">
				<label for=""><i class="iconfont icon-mima"></i></label>
				<input type="password" name="password" id="password" placeholder="密码" required v-model="passwordVal" />
			</div>
			<div class="password field clearfix">
				<label for=""><i class="iconfont icon-mima"></i></label>
				<input type="password" name="password2" id="password2" placeholder="确认密码" required v-model="rPasswordVal" />
			</div>
			<div class="submit">
				<input type="submit" value="立即注册" />
			</div>
		</form>

		<div class="other">
			已有账号
			<router-link to="/login">
				<span class="fr">立即登录</span>
			</router-link>
		</div>
	</div>
	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				emailVal: "",
				codeVal: "",
				passwordVal: "",
				rPasswordVal: "",
				GETCODE: false,
				TIMELIMIT: 120
			};
		},
		methods: {
			getCode: function() {
				if(!this.emailVal) {
					return;
				}
				var info = {
					email: this.emailVal
				}
				this.$http.post("/api/getCode", info).then(res => {
					var response = res.body;
					if(response.error === 0) {
						this.GETCODE = true;
						var time = setInterval(() => {
							this.TIMELIMIT--;
							if(this.TIMELIMIT < 0) {
								this.GETCODE = false;
								clearInterval(time);
								this.TIMELIMIT = 120
							}
						}, 1000);
					}else {
						alert(response.msg)
					}
				});
			},
			sendMsg: function() {
				var info = {
					email: this.emailVal,
					code: this.codeVal,
					password: this.passwordVal,
					replyPassword: this.rPasswordVal
				};
				console.log("aaaaaaaaa")
				this.$http.post("/api/register", info).then(res => {
					var response = res.body;
					console.log(response)
					if(response.error === 0) {
						this.$router.push("/register/success");
					}else {
						alert(response.msg);
					}
				});
			}

		}
	};
</script>

<style scoped>
	.bg {
		width: 100%;
		min-height: 700px;
		background: url(/static/img/bg.jpg) no-repeat;
		background-size: cover;
	}
	.ct {
		width: 40%;
		padding: 1rem 5rem;
		margin: auto;
		background: rgba(222,222,222,.1);
		border-radius: 20px;
	}
	
	.ct .logo {
		text-align: center;
	}
	
	.ct .logo img {
		width: 20%;
	}
	
	.ct form .field {
		margin-bottom: 1.2rem;
	}
	
	.ct form .field label {
		width: 20%;
		float: left;
		height: 3.5rem;
		text-align: center;
	}
	
	.ct form .field label i {
		width: 100%;
		height: 100%;
		display: inline-block;
		line-height: 3.5rem;
		border: 1px solid #ccc;
		border-right: 0;
		border-radius: 5px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.ct form .field input {
		width: 80%;
		float: left;
		height: 3.5rem;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border: 1px solid #ccc;
		padding-left: 1rem;
		color: #999;
	}
	
	.ct form .field input:focus {
		box-shadow: 0 0 1px #2299ff;
	}
	
	.ct form .submit input {
		border: none;
		width: 100%;
		height: 3.5rem;
		border-radius: 5px;
		background: #4bf;
		color: #fff;
		font-size: 1.4rem;
		transition: background .3s;
		cursor: pointer;
	}
	
	.ct form .submit input:hover {
		background: #49f;
	}
	
	.ct .other {
		margin-top: 1rem;
		text-align: right;
		font-size: 1.2rem;
	}
	
	.ct .other span {
		color: #2288ff;
		padding-left: 1rem;
		cursor: pointer;
	}
	
	.ct .other span:hover {
		color: #2299ff;
	}
	
	.ct form .message input {
		width: 45%;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.ct form .message span {
		float: left;
		width: 34%;
		height: 3.5rem;
		border: 1px solid #ccc;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-left: 0;
		line-height: 3.5rem;
		text-align: center;
		background: #ececec;
		color: #ccc;
		cursor: not-allowed;
	}
	
	.ct form .message span.active {
		cursor: pointer;
		background: #4b4;
		color: #fff;
	}
	
	.error-msg {
		display: none;
		font-size: 14px;
		color: red;
		margin: -10px 0px 10px 50px;
	}
</style>