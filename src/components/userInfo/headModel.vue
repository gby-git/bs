<template>
	<form class="model" @submit.prevent="sendMsg">
		<h2>头像上传<span class="close" @click="closeModel">&times;</span></h2>
		<div>
			<div class="upload">
					<label for="file_head" class="head_dis">
						<span class="iconfont icon-shangchuantupian"></span>
						<img :src="headUrl" alt="" v-if="headUrl"/>
					</label>
				<input type="file"  id="file_head" accept="image/png, image/jpeg, image/gif, image/jpg" @change="upload($event)"/>
			</div>
			<button class="confir">提交信息</button>
		</div>
	</form>
</template>

<script>
	export default {
		data: function() {
			return {
				headUrl: ""
			};
		},
		methods: {
			closeModel() {
				this.$emit("closeHead");
			},
			upload(e) {
				var headFile = e.target.files[0];
				var formData = new FormData();
				formData.append("headImg", headFile);
				this.$http.post("/api/uploadHead", formData).then(res => {
					this.headUrl = res.body[0];
				});
			},
			sendMsg() {
				var info = {
					headUrl: this.headUrl
				};
				this.$http.post("/api/saveHead", info).then(res => {
					if (res.body.error === 0) {	
						this.$store.commit("changeUserHead", res.body.headUrl);
						this.$emit("closeHead");
						
						
					}
				});
			}
		}
	}
</script>

<style scoped>
	.model {
		width: 100%;
		height: 100%;
		border: 1px solid #f6f6f6;
		background: #fff;
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