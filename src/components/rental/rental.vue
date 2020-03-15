<template>
	<form class="info" @submit.prvent="sendMsg">
		<div class="person_info">
			<h2>业主个人信息</h2>
			<div class="person_info_wrap">
				<div class="person_info_list">
					<h2>联系人姓名</h2>
					<div class="person_info_field normal">
						<input type="text" placeholder="例如：张三" required v-model="fieldValue.name" />
					</div>
				</div>
			</div>
			<div class="person_info_wrap">
				<div class="person_info_list">
					<h2>身份证号码</h2>
					<div class="person_info_field normal">
						<input type="text" placeholder="身份证号码" required v-model="fieldValue.idcard" />
					</div>
				</div>
			</div>
			<div class="person_info_wrap">
				<div class="person_info_list">
					<h2>头像上传</h2>
					<div class="person_info_field upload_pic">
						<label for="upload_head" class="upload_header">
							<input type="file" id="upload_head" accept="image/png, image/jpg, image/jpeg" @change="uploadHead($event)" required/>								
							<div class="header_pic">
								<img :src="fieldValue.headUrl" alt="" width="100%" height="100%" v-show="fieldValue.headUrl"/>
								<i class="iconfont icon-tupian" v-show="!fieldValue.headUrl"></i>
							</div>								
						</label>
						<div class="header_tip">
							<h2>图片要求:</h2>
							<div>1.请上传您的真实头像</div>
							<div>2.文件大小不超过2M</div>
							<div>3.图片格式为jpg或png</div>
							<div>4.为了节约您的时间，请上传清晰正面照</div>
						</div>
					</div>
				</div>
			</div>
			<div class="person_info_wrap">
				<div class="person_info_list">
					<h2>您的邮箱</h2>
					<div class="person_info_field normal">
						<input type="eamil" placeholder="我们将为您推送最新消息..." required v-model="fieldValue.email" />
					</div>
				</div>
			</div>
		</div>

		<div class="rules">
			<label>
					<input type="checkbox" v-model="fieldValue.agree"/>
					我已阅读并同意遵守协议内容
				</label>
			<a href="">《xxxx商家入驻协议书》</a>
		</div>

		<div class="submit">
			<input type="submit" value="同意并提交" :class="{active: isSubmit}" />
		</div>
	</form>
</template>

<script>
	export default {
		created: function() {
			if (localStorage.getItem("status") == null) {
				this.$router.push("/login");
				return;
			}else if(localStorage.getItem("status") === "1") {
				this.$router.push("/rental/wait");
				return;
			}
			//this.isLandlord();
		},
		data: function() {
			return {
				fieldValue: {
					headUrl: "",
					name: "",
					email: "",
					idcard: "",
					headFile: "",
					agree: ""
				},
				isSubmit: 0,
				formData: null
				
			};
		},
		methods: {
			isLandlord: function() {
				/*this.$http.post("/api/isLandlord").then(res => {
					if(res.body.isLandlord) {
						console.log(111)
						this.$router.push("/rental/wait");
					}
				});*/
			},
			uploadHead: function(e) {
				this.fieldValue.headFile = e.target.files[0];
				var headFile = this.fieldValue.headFile;
				if(headFile.size > 1024 * 1024 * 2) {
					alert("图片大小超过限制");
				} else if(headFile.type !== "image/png" && headFile.type !== "image/jpg" && headFile.type !== "image/jpeg") {
					alert("图片类型不正确");
				}
				this.formData = new FormData();
				this.formData.append("headImg", e.target.files[0]);

				this.$http.post("/api/uploadHead", this.formData).then(res => {
					this.fieldValue.headUrl = res.body[0];
				});
			},
			sendMsg: function() {				
				if (!this.isSubmit) {
					return;
				}
				var info = {};
				for (var i in this.fieldValue) {
					if (i !== "headFile") {
						info[i] = this.fieldValue[i];
					}
				}
				console.log(info)
				this.$http.post("/api/becomeLandlord", info).then(res => {
					if (res.body.error === 0) {
						this.$store.commit("getUserStatus", res.body.status);
						localStorage.setItem("status", res.body.status);
						this.$router.push("/rental/wait");
					}
				});
				
			}
		},
		watch: {
			fieldValue: {
				handler: function() {
					var flag = 0;
					for(var i in this.fieldValue) {
						if (this.fieldValue[i] === "" || this.fieldValue[i] == null) {
							flag = 1;
							break;
						}
					}
					flag === 0 ? this.isSubmit = 1 : this.isSubmit = 0;
				},
				deep: true
			},
			"$router": "isLandlord"
		}
	};
</script>

<style scoped>
	.info {
		width: 80%;
		margin: auto;
		border: 1px solid #ccc;
		padding: 2rem;
	}
	
	.person_info>h2 {
		color: #008489;
	}
	
	.person_info_wrap {
		padding: 2rem;
	}
	
	.person_info_list>h2 {
		font-size: 1.2rem;
		font-weight: normal;
		color: #666666;
	}
	
	.person_info_field {
		margin: 1rem 0;
	}
	
	.upload_pic {
		height: 130px;
	}
	
	.person_info_field.normal input {
		width: 300px;
		height: 30px;
		line-height: 30px;
		padding-left: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	
	.person_info_field input:focus {
		box-shadow: 0px 0px 3px #088;
	}
	
	.upload_header {
		float: left;
		margin-right: 2rem;
	}
	
	.upload_header input {
		display: none;
	}
	
	.upload_header .header_pic {
		border: 1px dashed #ccc;
		width: 130px;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	
	.upload_header .header_pic i {
		font-size: 2rem;
		color: #ccc;
	}
	
	.header_tip {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}
	
	.header_tip h2 {
		font-size: 1rem;
		color: #999;
	}
	
	.header_tip>div {
		color: #999;
	}
	
	.rules {
		text-align: center;
		height: 25px;
	}
	.rules label {
		cursor: pointer;	
	}
	.rules input[type=checkbox] {
		vertical-align: -2px;
	}
	.rules a {
		color: #78e;
		display: inline-block;
		padding-bottom: 2px;
	}
	.rules a:hover {
		border-bottom: 1px solid #78e;
	}
	.submit {
		text-align: center;
		margin-top: 2rem;
	}
	.submit input {
		width: 10rem;
		height: 3rem;
		border: none;
		color: #999;
		border-radius: 5px;
		cursor: pointer;;
	}
	.submit .active {
		color: #fff;
		background: #6b6;
	}
	.submit .active:hover {
		background: #2b2;
	}
</style>