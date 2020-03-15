<template>
	<form class="model" @submit.prevent="sendMsg" v-if="fields">
		<h2>修改基础资料<span class="close" @click="closeModel">&times;</span></h2>
		<div class="ct">
			<div class="ct_list">
				<label>用户名：</label>
				<input type="text" name="username" v-model="fields.name" />
			</div>
			<div class="ct_list">
				<label>电话号码：</label>
				<input type="text" name="email" v-model="fields.phone" />
			</div>
			<div class="ct_list">
				<label>邮箱：</label>
				<input type="text" name="email" v-model="fields.email" />
			</div>

			<div class="ct_list">
				<label>性别：</label>
				<input type="radio" name="sex" value="男" v-model="fields.sex"/>男
				<input type="radio" name="sex" value="女" v-model="fields.sex"/>女
			</div>

			<button class="confir">提交信息</button>
		</div>
	</form>
</template>

<script>
	export default {
		methods: {
			closeModel: function() {
				this.$emit("close");
			},
			sendMsg: function() {
				this.$http.post("/api/changeUserInfo", this.fields).then(res => {
					this.$store.commit("getUserData", res.body);
					this.$emit("close");	
					this.$store.commit("getUsername", this.fields.name);
					console.log(this.$store.state.username)
//					window.location.reload();
				});
			}
		},
		computed: {
			fields: function() {
				return this.$store.state.userData.userInfo;
			}
		}
	}
</script>

<style scoped>
	.model {
		width: 100%;
		height: 100%x;
		border: 1px solid #f6f6f6;
		background: #fff;
		transition: all 1s;
		box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
		border-radius: 5px;
	}
	
	.model>h2 {
		vertical-align: middle;
		padding: 1rem 0 1rem 2rem;
		background: #f6f6f6;
		font-weight: normal;
	}
	
	.model .close {
		float: right;
		margin-right: 1rem;
		cursor: pointer;
		font-size: 1.5rem;
	}
	
	.model .close:hover {
		color: #666;
	}
	
	.model .ct {
		padding: 5rem;
	}
	
	.model .ct_list {
		margin-bottom: 2rem;
	}
	
	.model>div label {
		display: inline-block;
		font-size: 1.2rem;
		width: 120px;
		margin-bottom: 1rem;
	}
	
	.model>div input[type=text] {
		width: 200px;
		border: 1px solid #ccc;
		padding: 5px 1rem;
		border-radius: 5px;
		color: #666;
	}
	

	
	.model>div .confir {}
	
	.model>div .confir {
		border: 1px solid #ccc;
		width: 8rem;
		height: 3rem;
		border-radius: 5px;
		background: #45a;
		position: absolute;
		bottom: .5rem;
		right: 2rem;
		cursor: pointer;
		transition: all .3s;
		color: #fff;
	}
	
	.model>div .confir:hover {
		background: #47f;
	}
	
	.model input[type=file] {
		width: 100px;
		height: 50px;
		border: none;
		background: #2cf;
		opacity: 0;
		display: none;
	}
	
	.model .upload label {
		position: absolute;
		width: 150px;
		height: 150px;
		left: 175px;
		top: 125px;
		text-align: center;
		line-height: 150px;
		border: 1px dotted #666;
	}
	
	.model .upload label img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.model .upload label span {
		font-size: 3rem;
		color: #777;
	}
</style>