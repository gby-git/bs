<template>
	<div class="bg">
		<div class="ct">
			<div class="logo"><img src="/static/img/logo.jpg" alt="logo" /></div>

			<form @submit.prevent="sendMsg">
				<div class="user field clearfix">
					<label for=""><i class="iconfont icon-denglu"></i></label>
					<input type="eamil" placeholder="邮箱" v-model="email" autocomplete="off" />
				</div>
				<div class="password field clearfix">
					<label for=""><i class="iconfont icon-mima"></i></label>
					<input type="password" placeholder="密码" v-model="pwd" />
				</div>
				<div class="submit">
					<input type="submit" value="登录" />
				</div>
			</form>

			<div class="other">
				没有账号
				<router-link to="/register"><span class="fr">立即注册</span></router-link>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				email: "",
				pwd: ""
			};
		},
		created: function() {

		},
		methods: {
			sendMsg: function() {
				var info = {};
				info.email = this.email;
				info.password = this.pwd;
				this.$http.post("/api/login", info).then(res => {
					var response = res.body;
					if(response.error === 0) {

						if(response.status === 2) {
							window.location = "/api/admin";
						} else {
							this.$router.push("/main");
						}
						localStorage.clear();
						
						this.$store.commit("getUserStatus", response.status);
						this.$store.commit("getUsername", response.username);
						
						localStorage.setItem("username", response.username);
						localStorage.setItem("userId", response.userId);
						localStorage.setItem("status", response.status);
					} else {
						alert("密码错误")
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
		position: relative;
		transform: translate(0, 20%);
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
		float: right;
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
</style>